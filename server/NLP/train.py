import os

from convabuse_loader import *  # if training again we will not write NLP.
from trainer import *
import json

from googletrans import Translator


batch_size = 32

train_ds, test_ds = create_datasets()


train_dl = torch.utils.data.DataLoader(
    train_ds, batch_size=batch_size, shuffle=True)
test_dl = torch.utils.data.DataLoader(
    test_ds, batch_size=batch_size, shuffle=True)

model = nn.Sequential(nn.Linear(train_ds.bag.shape[1], 480, bias=False), nn.ReLU(
), nn.Linear(480, 2))  # one hidden layer MLP
# model.load_state_dict(torch.load("results/classifier.pt")['model_state_dict'])

vectorizer = train_ds.vectorizer  # used for getting bag of words
message = "stop go hey guy."  # list of messages using concatenation
x = torch.from_numpy(vectorizer.transform(
    np.array([message])).toarray()).float()
res = model(x)
prob = torch.softmax(res, dim=1)
print(prob)
res = train_eval(model, train_dl, test_dl, epochs=50,
                 lr=0.01, weight_decay=3e-3)


def translate(msg):
    translator = Translator()
    translation = translator.translate(msg, dest='en', src='he')
    return translation.text

#print(translate("שלום לך חבר קרוב"))


def check_conversation(messages):
    global model
    global vectorizer

    messaegs = [translate(msg) for msg in messages]

    text = messages[0] + ' ' + messages[1] + \
        ' ' + messages[2] + ' ' + messages[3]
    vec = torch.from_numpy(vectorizer.transform(
        np.array([text])).toarray()).float()
    res = model(vec)
    prob = torch.softmax(res, dim=1)
    return prob[0][1].item()

#print(check_conversation(["שלום", "לך", "עצור", "מספיק עם זה"]))


#file = open("results/res.txt", "w")
# file.write(json.dumps(res))
# file.close()
