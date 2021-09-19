// data structure for pending txns
const CSV_data = require("./CSV_data.js");
const Transaction_MT = require("./transaction.js");

function Pending_Transaction_Pool(tx = []) {
    this.transactions = tx;
    this.pending_transactions = tx;
    //this.queue_transactions = [];
    //this.all_transactions = [];
};

Pending_Transaction_Pool.prototype.create = function(num) {
    var data = new CSV_data();
    var data_ = data.getData(num); //get data of block1
    if(num == 1) {
        for(var i = 1; i < 44; i++) {
            var txn = new Transaction_MT(data_[i][0], data_[i][2], data_[i][3], data_[i][4]);
            this.transactions.push(txn);
        }
    }
    else if(num == 2) {
        for(var i = 1; i < 44; i++) {
            var txn = new Transaction_MT(data_[i][0], data_[i][2], data_[i][3], data_[i][4]);
            this.transactions.push(txn);
        }
    }
    else if(num == 3) {
        for(var i = 1; i < 50; i++) {
            var txn = new Transaction_MT(data_[i][0], data_[i][2], data_[i][3], data_[i][4]);
            this.transactions.push(txn);
        }
    }
    else console.log("wrong block number.");
}

Pending_Transaction_Pool.prototype.clean = function() {
    this.transactions = [];
}

Pending_Transaction_Pool.prototype.get_transaction = function() {
    return this.transactions;
}

Pending_Transaction_Pool.prototype.get_num_of_transaction = function() {
    return this.transactions.length;
}

Pending_Transaction_Pool.prototype.repeat = (tx)=>{
    this.pending_transactions.array.forEach(element => {
        if(tx.id === element.id){
            return true;
        }
    });
    return false;
}

Pending_Transaction_Pool.prototype.validate = (tx) =>{
    if(tx.value < 0){
        return false;
    }

    return true;
}

Pending_Transaction_Pool.prototype.addTx = (tx)=>{
    if(this.validate(tx) && !this.repeat(tx)){
        this.pending_transactions.push(tx);
    }

    

}

Pending_Transaction_Pool.prototype.addTxs = (txs) =>{
    txs.array.forEach(tx => {
        this.addTx(tx);
    });
}

Pending_Transaction_Pool.prototype.remove = (tx) =>{
    this.pending_transactions.array.forEach((element, index) => {
        if(tx.id === element.id){
            this.pending_transactions.splice(index, 1);
        }
   });
}

Pending_Transaction_Pool.prototype.clear = () =>{
    pending_transactions = [];
}

module.exports = Pending_Transaction_Pool;