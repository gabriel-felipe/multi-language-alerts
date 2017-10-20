'use strict';

var fs = require('fs');
var langs = function(){
    const langDir = "../langs";
    var _self = this;
    this.langs = {};
    this.notTranslated = {};
    this.load = function(){
        var langs = fs.readdirSync(langDir);
        for (var id in langs){
            var langName = langs[id];
            _self.langs[langName] = {};
            let langFolder = langDir+"/"+langName;
            let files = fs.readdirSync(langFolder);
            for (var fileId in files) {
                let file = files[fileId];
                let parsedFile = JSON.parse(fs.readFileSync(langFolder+"/"+file, 'utf8'));
                for (var key in parsedFile) {
                    _self.langs[langName][key] = parsedFile[key];
                }
            }

        }
        return _self.langs;
    }

    this.translatedPercentual = function(lang){
        if (typeof(_self.langs[lang]) !== "undefined") {
            let defaultLang = _self.langs["default"];
            let totalKeys = Object.keys(defaultLang).length;
            let translatedKeys = 0;
            _self.notTranslated[lang] = [];
            for (var key in defaultLang) {
                if(_self.isTranslated(key,lang)){
                    translatedKeys++;
                } else {
                    _self.notTranslated[lang].push(key);
                }
            }
            return (translatedKeys/totalKeys) * 100;
        }
    }

    this.isTranslated = function(key,lang){
        let defaultLang = _self.langs["default"];
        let langValues = _self.langs[lang];
        if (
            typeof(langValues[key]) !== "undefined" &&
            langValues[key] !== defaultLang[key]
        ) {
            return true;
        } else {
            return false;
        }
    }

}
module.exports = new langs();
