// const Web3 = require('web3');
// const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY');

function MPT(root=false){
    this.mode = null;
    this.key  = null;
    this.value = null;
    this.next = null;
    this.branch = [ null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null, null, null ]
    this.Update_flag = null
    this.Update_value = null
    this.root = root
};

MPT.prototype.Display = function(level) {

    if(this.mode == null) {
        console.log("Empty Trie")
        return;
    }
    
    if(this.mode == 'leaf') {
        if((this.key.length)%2==0){
            prefix = '20';
        }
        else{
            prefix = '3';
        }
        console.log( ">" + '\t'.repeat(level) + "leaf: (" + prefix +")" + this.key + ", " + this.value);
        return;
    } else if(this.mode == 'extension') {
        if((this.key.length)%2==0){
            prefix = '00';
        }
        else{
            prefix = '1';
        }
        console.log(">" + '\t'.repeat(level) + "extension: (" + prefix +")" + this.key);
        this.next.Display(level+1);
        return;
    }
    else if(this.mode == 'branch'){
        console.log(">" + '\t'.repeat(level) + "branch");
        var j = 0;
        for(var i in this.branch){
            if(this.branch[i] != null){
                if(j == 16) {
                    console.log(">" + '\t'.repeat(level) + "      value:");
                } else {
                    console.log(">" + '\t'.repeat(level) + "      " + j.toString(16) + ":");
                }
                this.branch[i].Display(level+1);
            }
            j += 1;
        }
        return;
    }
};

MPT.prototype.Insert = function(key, value) {
    if(this.mode != null){
        if(key == this.key){
            console.log(">Weird request. User already exist");
            return;
        }
    }
    if(this.mode == null){
        this.mode = 'leaf';
        this.key = key;
        this.value = value;
    } else if(this.mode == 'branch'){
        if(key.length == 0){
            this.value = value;
        } else {
            ch = parseInt(key[0], 16);
            if(this.branch[ch] == null){
                this.branch[ch] = new MPT();
            }
            this.branch[ch].Insert(key.substr(1),value);
        }

    } else if(this.mode=='extension') {
        var i = 0;
        while(key[i] == this.key[i]){
            i++;
            if(i == this.key.length)
                break;
        }
        if(i == 0){
            this.mode = 'branch';
            if(this.key.length == 1){
                this.branch[parseInt(key[0],16)] = new MPT();
                this.branch[parseInt(key[0],16)].Insert(key.substr(1),value);
                this.branch[parseInt(this.key[0],16)] = this.next;
            } else {
                this.branch[parseInt(key[0],16)] = new MPT();
                this.branch[parseInt(key[0],16)].Insert(key.substr(1),value);
                var NewNode = new MPT()
                NewNode.mode = 'extension';
                NewNode.key = this.key.substr(1);
                NewNode.next = this.next;
                this.branch[parseInt(this.key[0],16)] = NewNode;
            }
        } else if(i == this.key.length) {
            this.next.Insert(key.substr(i),value);
        } else {
            if(i == (this.key.length - 1)) {
                var NewNode = new MPT();
                NewNode.mode = 'branch';
                NewNode.branch[parseInt(key[i], 16)] = new MPT();
                NewNode.branch[parseInt(key[i], 16)].Insert(key.substr(i+1),value);
                NewNode.branch[parseInt(this.key[i], 16)] = this.next;
                this.key = key.substr(0,i);
                this.next = NewNode;
            } else {
                var NewNode = new MPT();
                NewNode.mode = 'branch';
                NewNode.branch[parseInt(key[i], 16)] = new MPT();
                NewNode.branch[parseInt(key[i], 16)].Insert(key.substr(i+1),value);
                NewNode.branch[parseInt(this.key[i], 16)] = new MPT();
                NewNode.branch[parseInt(this.key[i], 16)].mode = 'extension';
                NewNode.branch[parseInt(this.key[i], 16)].key = this.key.substr(i+1);
                NewNode.branch[parseInt(this.key[i], 16)].next = this.next;
                this.key = key.substr(0,i);
                this.next = NewNode;
            }
        }
    }
    else if(this.mode == 'leaf'){
        var i = 0;
        while(key[i] == this.key[i]) {
            i++;
            if(i == key.length) break;
        }
        if(i == 0) {
            this.mode = 'branch';
            this.branch[parseInt(key[0],16)] = new MPT();
            this.branch[parseInt(key[0],16)].Insert(key.substr(1), value);
            this.branch[parseInt(this.key[i], 16)] = new MPT();
            this.branch[parseInt(this.key[i], 16)].Insert(this.key.substr(1), this.value);

        } else {
            this.mode = 'extension';
            var NewNode = new MPT();
            NewNode.mode = 'branch';
            NewNode.branch[parseInt(key[i],16)] = new MPT();
            NewNode.branch[parseInt(key[i],16)].Insert(key.substr(i+1),value);
            NewNode.branch[parseInt(this.key[i],16)] = new MPT();
            NewNode.branch[parseInt(this.key[i],16)].Insert(this.key.substr(i+1),this.value);
            this.key = key.substr(0,i);
            this.next = NewNode;
        }
    }

};

MPT.prototype.Search = function(key, Update_flag=null, Update_value=null) {

};
MPT.prototype.Update = function() {

};
MPT.prototype.Cal_back_nibble = function() {

};
MPT.prototype.Cal_hash = function(){

};

module.exports = MPT;
Tree = new MPT(true);
Tree.Insert('a120',0);
Tree.Display(0); console.log("*********");
Tree.Insert('abd2',1);
Tree.Display(0); console.log("*********");
Tree.Insert('abcd',2);
Tree.Display(0); console.log("*********");
Tree.Insert('abce',3);
Tree.Display(0); console.log("*********");
Tree.Insert('f000',4);
Tree.Display(0); console.log("*********");