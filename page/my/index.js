Page({
    data: {
        score: 0,
        level: 1,
        valid_pos: [9999],
        current: { src: './voice/success.wav' },
        audioAction: { method: 'stop' }
    },
    audioPlayed: function(e) {
        console.log('audio is played')
    },
    onLoad: function(options) {
        this.setData(init(this.data.level));
    },
    hit: function(e) {
        if (this.data.valid_pos[0] == parseInt(e.target.id)) {
            this.data.valid_pos.splice(0, 1);
            this.setData({
                score: this.data.score + 100,
                audioAction: {method: 'play'},
                ['c_'+e.target.id]: "bc_white",
                ['b_'+e.target.id]: ""
            })
        } else {
            this.setData({
                score: this.data.score - 100,
                audioAction: {method: 'play'}
            })
        }
        if (this.data.valid_pos.length == 0) {
            //refresh box
            var level = this.data.score<1000?1:Math.ceil(this.data.score/1000);
            this.setData({level: level});
            this.setData(init(this.data.level));
        }
    }
});

function getData(v, valid_pos) {
    var dataAry = {};
    for (var i = 0; i < v.length; i++) {
        dataAry['b_'+i] = v[i].num;
        dataAry['c_'+i] = v[i].color;
    }
    dataAry['valid_pos'] = valid_pos;

    return dataAry;
}

function getNumber() {
    num = Math.round(Math.random() * 50 - Math.random() * 50)
    return num === 0 ? 1 : num;
}

function getPos() {
    return Math.round(Math.random() * 25)
}

function init(level) {
    var v = [];
    var num_exist = [];
    var pos_exist = [];
    var count = level + 3;

    for (var i = 0; i < 25; i++) {
        v[i] = {"color": "bc_white", "num":""};
    }

    while(1) {
        var pos = getPos();
        if (pos_exist.indexOf(pos) != -1) {
            continue;
        }

        var num = getNumber();
        if (num_exist.indexOf(num) != -1) {
            continue;
        }

        v[pos].num = num;
        v[pos].color = "bc_b" + Math.round(Math.random()*4+1);

        pos_exist.push(pos);
        num_exist.push(num);

        if (pos_exist.length >= count) {
            break;
        }
    }

    var valid = [9999];
    valid_pos = [9999];
    for (i = 0; i < v.length; i++) {
        var item = v[i].num
        if (item == "") {
            continue;
        }
        for (var j = 0; j < valid.length; j++) {
            if (item < valid[j]) {
                valid.splice(j, 0, item);
                valid_pos.splice(j, 0, i);
                break;
            }
        }
    }
    valid.pop();
    valid_pos.pop();

    return getData(v, valid_pos);
}