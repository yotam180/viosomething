import os

from NLP.convabuse_loader import *
#from trainer import *
import json

from googletrans import Translator



batch_size = 32


train_ds, test_ds = create_datasets('NLP')




model = nn.Sequential(nn.Linear(train_ds.bag.shape[1], 100, bias=False), nn.ReLU(), nn.Linear(100, 2)) #one hidden layer MLP
model.load_state_dict(torch.load("NLP/results/classifier.pt")['model_state_dict'])

vectorizer = train_ds.vectorizer #used for getting bag of words
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


def check_conversation(messages):
    global model
    global vectorizer

    messaegs = [translate(msg) for msg in messages]

    text = messages[0] + ' ' + messages[1] + ' ' + messages[2] + ' ' + messages[3]
    vec = torch.from_numpy(vectorizer.transform(np.array([message])).toarray()).float()
    res = model(x)
    prob = torch.softmax(res, dim=1)
    return prob[1]



#file = open("results/res.txt", "w")
#file.write(json.dumps(res))
#file.close()

