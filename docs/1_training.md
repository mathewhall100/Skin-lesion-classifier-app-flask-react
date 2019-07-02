# Training the Model

1.  Deep learning library
2.  Setting up GPU
3.  Getting the data
4.  Training the model 

## Deep learning library:  fastai
I used the [fastai](https://github.com/fastai/fastai) deep learning library, whuch runs on top of PyTorch.  The [fastai MOOC](https://docs.fast.ai) was officially released to the public in early 2019.

## GPU:  Google Colaboratory
The data was retrieved and analyzed on Google Colaboratory (https://colab.research.google.com/), though any cload GPU platform could have been used. Instructions for setting up a GPU working environment are available from fastai (https://course.fast.ai/start_colab.html). This project used the Nvidia Tesla K80 with 12 GB of storage.  

## Dataset:  ISIC skin lesion archive
The Intrnational Skin Imaging Collaboration (ISIC) Skin Lesion Archive (https://www.isic-archive.com/#!/topWithHeader/wideContentTop/main) was used to obtain images of benign nevi and malignant melanoma. A total of 2000 images of malignant melanoma and 3000 of benign nevi were selected from the archive and downloaded. Images that had additional visual clues such as physician or surgical markings were excluded from the dataset. All images were resized to 250x250px using ImageMagick command line tool but were otherwise uncleaned. A single image file containing all the images combined and two csv files containing the imageId and respective labels were uploaded to Google drive

## Training the data:  Densenet161 CNN
The model was initial trained using a resnet34 model which acheived a maximal accuracy of around 82% before overfitting became a problem and error rate increased. Overfitting was reduced by using a densenet161 model with increasing weight decay.

### Training Time
Using the Densenet161 CNN architecture.  The model took about two hours to run on the google colab platform.

### Training the Deep Learning Model
The code used for training the data is available as a jupyter notebook in the repository https://github.com/mathewhall100/ISIC-skin-lesion-identification

The fast ai data block API was used to prepare the data:
- specifies the path where the images are located
- assigns training/validation ratio to 80/20
- we used a custom set of image transforms which included vertical flipping 
- sets the image size to 224
- sets batch size to 16
- normalizes the images using imagenet stats

```python
sz_sm = 224
bs_densenet=16
data_path = PATH + "train"
trfm = get_transforms(do_flip=True, flip_vert=True, max_rotate=10.0, max_zoom=1.1, max_lighting=0.2, max_warp=0.2, p_lighting=0.75)
train_img = (ImageList.from_df(df_labels, data_path)
        .split_by_rand_pct(0.2)
        .label_from_df()
        .transform(trfm, size=sz_sm)
        .databunch(path='.', bs=bs_densenet, device=torch.device('cuda:0'))
        .normalize(imagenet_stats)
       )
```

The data is trained on a pre-trained model, densenet161, and we run the `learner` to determine the optimal learning rate. 
```python
learn = create_cnn(train_img, models.densenet161, metrics=[error_rate, accuracy], pretrained=True)
learn.lr_find()
learn.recorder.plot()
```
In our case, a learning rate of 0.01 works well
```python
lr = 5e-04
```
Next, we fit 8 epochs using our learning rate of 0.01, and we observe our error rate drop to 13.8%.  We did run more complex architectures.  However, because the data had 101 classes and for the purpose of this example and article, and GPU time and storage, we used a simple architecture of `resnet34`. 
```python
learn.fit_one_cycle(5, lr)
```
epoch	train_loss	valid_loss	error_rate	accuracy	time
0	0.635727	0.585465	0.236971	0.763029	18:26
1	0.520972	0.407321	0.176008	0.823992	01:27
2	0.420803	0.346257	0.171091	0.828909	01:26
3	0.372901	0.314194	0.140610	0.859390	01:26
4	0.355656	0.302884	0.138643	0.861357	01:25


#### Unfreezing the layers
Next, we unfreezed some of the last layers and looked for a new learning rate. 
```python
learn.unfreeze()
```
#### More training
We trained the data for 5 more epochs, which reduced our error rate from 13.2% to 11.7%.

```python
:
learn.fit_one_cycle(10, wd=1.0, max_lr=slice(1e-5, lr/5))
```
epoch	train_loss	valid_loss	error_rate	accuracy	time
0	0.377349	0.302153	0.131760	0.868240	01:54
1	0.366729	0.314138	0.141593	0.858407	01:54
2	0.343207	0.293442	0.129794	0.870206	01:53
3	0.326379	0.276096	0.124877	0.875123	01:53
4	0.284331	0.281946	0.127827	0.872173	01:53
5	0.281685	0.277695	0.124877	0.875123	01:53
6	0.216056	0.254995	0.115044	0.884956	01:53
7	0.228848	0.258401	0.116028	0.883972	01:53
8	0.194991	0.253467	0.116028	0.883972	01:53
9	0.202855	0.254093	0.117994	0.882006	01:53


#### Confusion matrix
The confusion matrix revealed that:
        76 out of 423 malignant melanoma were missclassified as benign nevi
        44 out of 594 benign nevi were missclassified as malignant melanoma 

#### Sensitivity and specificity 

sensitivity: true negatives/true negatives+false positives = 82.0%
specificity: true negatives/true negatives + false positibes = 92.6%


### Output from the Deep Learning Model
The model was downloaded to google drive from jupyter notebook as model.pkl file 

The `model.pkl` file may be too large to be included in the git commit.  There are various options for proceeding with that size dataset:  
1.  Store the model on google drive.
2.  Store the model on GitHub releases.
3.  Store the model on a bucket in the cloud.  

The final model data file was stored under the "releases" area of the repository:  https://github.com/mathewhall100/ISIC-skin-lesion-identification/releases

 
