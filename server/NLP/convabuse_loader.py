from torchsummary import summary

import os
import sys
import time
import torch
import matplotlib.pyplot as plt
import warnings
import torch.nn as nn
import numpy as np
import pandas as pd
import torchtext
import torchtext.data
from torchtext.legacy import data
from torchtext.vocab import Vectors, GloVe
import torchtext.datasets
import collections
from sklearn.feature_extraction.text import CountVectorizer

warnings.simplefilter("ignore")
plt.rcParams['font.size'] = 20
data_dir = os.path.expanduser('~/.pytorch-datasets')
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

'''
def load_dataset(name='SST'):
    review_parser = torchtext.data.Field(
        sequential=True, use_vocab=True, lower=True,
        init_token='<sos>', eos_token='<eos>', dtype=torch.long,
        tokenize='spacy', tokenizer_language='en_core_web_sm')
    # This Field object converts the text labels into numeric values (0,1,2)
    label_parser = torchtext.data.Field(
        is_target=True, sequential=False, unk_token=None, use_vocab=True
    )

        
    #3 classes SST
    ds_train, ds_valid, ds_test = torchtext.datasets.SST.splits(
        review_parser, label_parser, root=data_dir ,fine_grained=False)

    print(f'Number of training samples: {len(ds_train)}')
    print(f'Number of test     samples: {len(ds_test)}')
    #build the vocabulary:
    review_parser.build_vocab(ds_train,vectors=GloVe(name='6B', dim=300))
    label_parser.build_vocab(ds_train)
    word_embeddings = review_parser.vocab.vectors
    word_embeddings = word_embeddings.to(device)
        
        
    # BucketIterator creates batches with samples of similar length
    # to minimize the number of <pad> tokens in the batch.
    dl_train, dl_valid, dl_test = torchtext.data.BucketIterator.splits((ds_train, ds_valid, ds_test), batch_size=BATCH_SIZE,shuffle=True, device=device)
    train_iter, valid_iter, test_iter = torchtext.data.BucketIterator.splits((ds_train, ds_valid, ds_test), batch_size=BATCH_SIZE, sort_key=lambda x: len(x.text), repeat=False, shuffle=True)
    return word_embeddings,train_iter, valid_iter, test_iter

'''




def create_datasets(src=''):
    train_df = pd.read_csv(os.path.join(src,"2_splits/ConvAbuseEMNLPtrain.csv"))
    test_df = pd.read_csv(os.path.join(src,"2_splits/ConvAbuseEMNLPtest.csv"))
    ds = ConvAbuseDataset(train_df)
    return ds , ConvAbuseDataset(test_df, vectorizer=ds.vectorizer) #, test and validation

class ConvAbuseDataset(torch.utils.data.Dataset): 
    def __init__(self, df, fields=(2,6), vectorizer=None): #default fields are 2,3,4,5 - recent chat
        data = df.to_numpy()
        self.fields = fields
        text = data.T[2:6].T #can stack 2-5 as one long string
        text = text.T[0] + ' ' + text.T[1] + ' ' + text.T[2] + ' ' + text.T[3]

        self.vectorizer = vectorizer
        if self.vectorizer is None:
            self.vectorizer = CountVectorizer() #can add ngrams bound
            self.bag = self.vectorizer.fit_transform(text).toarray() #in inference we will use transform, test dataset will use it as well
        else:
            self.bag = self.vectorizer.transform(text).toarray()
       
        
        self.bag = torch.from_numpy(self.bag).float()
        self.labels = (data.T[-1].T)

    def __len__(self):  
        #print(self.bag.shape[0])
        return self.bag.shape[0]

    def __getitem__(self, i):
        return self.bag[i], torch.tensor(self.labels[i]).long() #can remove this int
        return self.data[i][self.fields[0] : self.fields[1]] #returns text, can return bag of words

#TODO: over this dataset create vocabulary and use embedding or use bag of words


