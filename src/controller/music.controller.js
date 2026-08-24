const musicModel = require('../model/music.model')
const albumModel = require('../model/album.model')
const {uploadFile} = require('../services/storage.service')
const jwt = require('jsonwebtoken')

async function createMusic(req, res){

    const{title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri : result.url,
        title,
        artist : req.user._id

    })

    res.status(201).json({
        id : music._id,
        uri : music.uri,
        title : music.title,
        artist : music.artist

    })


}




async function createAlbum(req, res){

   const{title ,musics} = req.body;
    
        const album = await albumModel.create({
            title,
            musics : musics,
            artist : req.user._id
    
        })
    
        res.status(201).json({

            message : "Album created successfully",
            album :{
            id : album._id,
            title : album.title,
            musics : album.musics,
            artist : album.artist
            }
    
        })

}

async function getAllMusic(req,res){
    const musics = await musicModel.find().limit(3);

    res.status(200).json({
        message : "musics fetched successfully",
        musics : musics
    })
}

async function getAllAlbum(req,res){
    const albums = await albumModel.find().select("title artist ").populate("artist", "username email");

    res.status(200).json({
        message : "albums fetched successfully",
        albums : albums
    })
}

async function getAlbumById(req,res){
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics");

    res.status(200).json({
        message : "album fetched successfully",
        album : album
    })
}

module.exports = {createMusic,createAlbum, getAllMusic, getAllAlbum , getAlbumById}