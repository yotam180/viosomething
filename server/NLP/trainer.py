from convabuse_loader import *
from tqdm import tqdm

def train_eval(classifier, train_dl, valid_dl, epochs=20, lr=0.01, weight_decay=0.001):
    torch.autograd.set_detect_anomaly(True)

    optimizer = torch.optim.Adam(classifier.parameters(), lr=lr, weight_decay=weight_decay)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer=optimizer, T_max=epochs, eta_min=0, verbose=True)
    loss_func = torch.nn.CrossEntropyLoss()
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    max = 0.0
    classifier = classifier.to(device)
    train_losses, train_acc, valid_acc = [], [] , []
    for epoch in range(epochs):
        
        t_acc, avg_loss_train = train_epoch(classifier, train_dl, optimizer, loss_func, epoch, epochs)
        
        v_acc = valid_epoch(classifier, valid_dl, epoch, epochs)
       
        epoch_loss = np.mean(avg_loss_train)
        train_losses.append(epoch_loss.tolist())
        train_acc.append(t_acc.tolist())
        valid_acc.append(v_acc.tolist())
        if v_acc >= max: #save best classifier for further statistic check
            max = v_acc
            #torch.save({
            #'epoch': epoch,
            #'model_state_dict': classifier.state_dict(),
            #'optimizer_state_dict': optimizer.state_dict(),
            #'loss': epoch_loss,
            #}, 'results/classifier.pt')
        
        scheduler.step()
        
        
    return train_losses, train_acc, valid_acc

  
def train_epoch(classifier, train_dl, optimizer, loss_func, epoch, epochs):
    avg_loss_train = []
    tot_loss, tot_samples, t_acc = 0.0, 0, 0
    bar = tqdm(train_dl)
    for x, y in bar:
        torch.cuda.empty_cache()
        classifier.train()
        optimizer.zero_grad()
        
        x, y = x.to(device), y.to(device)

        # Run through network
        res = classifier(x)
        t_acc += torch.sum(torch.eq(torch.argmax(res, dim=1), y)) #accuracy is calculated only over original images
        # Calculate loss and backprop
        loss = loss_func(res, y)
        avg_loss_train.append(loss.item())

        loss.backward()
        optimizer.step()
        

        tot_samples += x.shape[0]
        tot_loss += loss.item() * x.shape[0]
        bar.set_description(f'TEpoch:[{epoch+1}/{epochs}]  Accuracy:{t_acc / tot_samples}', refresh=True)
    
    return t_acc / tot_samples, avg_loss_train
    
def valid_epoch(classifier, valid_dl, epoch, epochs):
    v_acc, tot_samples, vbar = 0.0, 0, tqdm(valid_dl)
    for x, y in vbar:
        classifier.eval()

        x, y = x.to(device), y.to(device)

        res = classifier(x)
        v_acc += torch.sum(torch.eq(torch.argmax(res, dim=1), y))
        tot_samples += x.shape[0]
        vbar.set_description(f'VEpoch: [{epoch+1}/{epochs}] Acc: {v_acc / tot_samples}', refresh=True)
    
    return v_acc / tot_samples