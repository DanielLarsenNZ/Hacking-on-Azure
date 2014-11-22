﻿module.exports.importPlaylist = function (message, callback) {
    invokeImportService(message, callback);
    // queueForImporting(message, callback);
};

var invokeImportService = function (message, callback) {
    var edge = module.require("edge");

    // crazy horses invoking .NET DLL from Node.js thanks edge.js
    var importPlaylist = edge.func({
        assemblyFile: __dirname + '/../../Jukebox/bin/Debug/Jukebox.dll',
        typeName: 'Jukebox.Services.ImportSpotifyPlaylistServiceInvoker',
        methodName: 'Invoke' 
    });
    
    importPlaylist(message, function (error, result) { 
        console.log("invoked Jukebox.Services.ImportSpotifyPlaylistServiceInvoker.Invoke()", message, error, result);
        callback(error);
    });
};

var queueForImporting = function (message, callback) { 
    // queue for import and return
    var queue = require('./queuestorage.js');
    
    queue.createMessage('import-playlist', JSON.stringify(message), function (error) {
        callback(error);
    });
};