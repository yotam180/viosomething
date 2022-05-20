from convabuse_loader import *
from trainer import *
import json
import os

os.chdir("C:\\Users\\Admin\\Documents\\Technion\\Tutorials\my_summary\\SELA\\viosomething\\server\\NLP")

batch_size = 32


train_ds, test_ds = create_datasets()


train_dl = torch.utils.data.DataLoader(train_ds ,batch_size=batch_size, shuffle=True)
test_dl = torch.utils.data.DataLoader(test_ds ,batch_size=batch_size, shuffle=True)

model = nn.Sequential(nn.Linear(train_ds.bag.shape[1], 100, bias=False), nn.ReLU(), nn.Linear(100, 2)) #one hidden layer MLP
model.load_state_dict(torch.load("results/classifier.pt")['model_state_dict'])

vectorizer = train_ds.vectorizer #used for getting bag of words
# message = "stop stop stop fuck hit attack no want want." #list of messages using concatenation
# x = torch.from_numpy(vectorizer.transform(np.array([message])).toarray()).float()
# res = model(x)
# prob = torch.softmax(res, dim=1)
# print(prob)
#res = train_eval(model, train_dl, test_dl, epochs=20, lr=0.01, weight_decay=1e-2)
def check_conversation(messages):
    global model
    global vectorizer
    text = messages[0] + ' ' + messages[1] + ' ' + messages[2] + ' ' + messages[3]
    vec = torch.from_numpy(vectorizer.transform(np.array([message])).toarray()).float()
    res = model(x)
    prob = torch.softmax(res, dim=1)
    return prob[1]



#file = open("results/res.txt", "w")
#file.write(json.dumps(res))
#file.close()

