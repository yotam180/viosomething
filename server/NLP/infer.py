import os

from NLP.convabuse_loader import *
#from trainer import *
import json

from googletrans import Translator


batch_size = 32


train_ds, test_ds = create_datasets('NLP')


model = nn.Sequential(nn.Linear(train_ds.bag.shape[1], 1000, bias=False), nn.ReLU(), nn.Linear(1000, 2))  # one hidden layer MLP
model.load_state_dict(torch.load(
    "NLP/results/classifier.pt")['model_state_dict'])

vectorizer = train_ds.vectorizer  # used for getting bag of words
# message = "stop stop stop fuck hit attack no want want." #list of messages using concatenation
# x = torch.from_numpy(vectorizer.transform(np.array([message])).toarray()).float()
# res = model(x)
# prob = torch.softmax(res, dim=1)
# print(prob)
#res = train_eval(model, train_dl, test_dl, epochs=20, lr=0.01, weight_decay=1e-2)


def translate(msg):
    translator = Translator()
    translation = translator.translate(msg, dest='en', src='he')
    return translation.text


def safe_get(messages, index):
    if len(messages) - 1 < index:
        return ''
    return messages[index]


def check_conversation(messages):
    global model
    global vectorizer

    translated_messages = [translate(msg) for msg in messages]

    text = safe_get(translated_messages, 0) + ' ' + safe_get(translated_messages, 1) + \
        ' ' + safe_get(translated_messages, 2) + ' ' + safe_get(translated_messages, 3)
    vec = torch.from_numpy(vectorizer.transform(
        np.array([text])).toarray()).float()
    res = model(vec)
    prob = torch.softmax(res, dim=1)
    return prob[0][1].item()


#file = open("results/res.txt", "w")
# file.write(json.dumps(res))
# file.close()
