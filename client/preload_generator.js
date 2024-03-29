var fs = require('fs');
var path = require('path');
var jsesc = require('jsesc');
var upath = require('upath');

var spritesheet_regex = /char_(\d+)_(\d+)_.+/;

function readDir(dirPath) {
    var result = [];
    var files = fs.readdirSync(dirPath);

    for (var f of files) {
        var file_assets_path = path.join(dirPath, f);
        var stat = fs.statSync(file_assets_path);
        if(stat.isDirectory()){
            var subDirEntries = readDir(file_assets_path);
            result = result.concat(subDirEntries);
        }
        else if (stat.isFile()) {
            var fileInfo = path.parse(file_assets_path);

            var file_entry = {
                cache_key: path.relative('assets/', file_assets_path)
            };

            if(['.png', '.jpg'].indexOf(fileInfo.ext) !== -1) {
                if((m = spritesheet_regex.exec(fileInfo.name)) !== null){
                    if (m.index === spritesheet_regex.lastIndex) {
                        spritesheet_regex.lastIndex++;
                    }

                    file_entry.type = "charset";
                    file_entry.w = m[1];
                    file_entry.h = m[2];
                }
                else {
                    file_entry.type = "image";
                }
                result.push(file_entry);
            }

            if(fileInfo.ext == '.map') {
                file_entry.type = "map";
                result.push(file_entry);
            }

            if(['.mp3', '.wav', '.ogg'].indexOf(fileInfo.ext) !== -1) {
                file_entry.type = "audio";
                result.push(file_entry);
            }

            if(file_entry.type) {
                console.log("Packaging '" + fileInfo.name + "' as " + file_entry.type);
            }
        }
    }

    return result;
}

var loader = function(){
    var assetList = readDir('assets');
    var code = "module.exports = function(game) {\n"

    for (var asset of assetList) {
        switch (asset.type) {
            case "image":
                code += "    game.load.image('" + jsesc(upath.normalizeSafe(asset.cache_key)) + "', '" + jsesc(upath.normalizeSafe(asset.cache_key)) + "');\n"
                break;

            case "audio":
                code += "    game.load.audio('" + jsesc(upath.normalizeSafe(asset.cache_key)) + "', '" + jsesc(upath.normalizeSafe(asset.cache_key)) + "');\n"
                break;
            case "charset":
                code += "    game.load.spritesheet('" + jsesc(upath.normalizeSafe(asset.cache_key)) + "', '" + jsesc(upath.normalizeSafe(asset.cache_key)) + "', " + asset.w + ", " + asset.h + ");\n";
                break;
            case "map":
                code += "    game.load.tilemap('" + jsesc(upath.normalizeSafe(asset.cache_key)) + "', '" + jsesc(upath.normalizeSafe(asset.cache_key)) + "', null, Phaser.Tilemap.TILED_JSON);\n"
                break;
            default:
            break;

        }
    }

    code += "};\n";

    return code;
};

module.exports = loader();
