window.Miner = (function() {
    const OUR_GAME = isDev ? 'luckymultisc' : 'luckyminersh';

    function Miner(eos, rpc, account) {
        if (!(this instanceof Miner)) {
            return new Miner(api, account);
        }
        this.eos = eos;
        this.rpc = rpc;
        this.account = account;
    }

    Miner.prototype.mine = function(assetCreator, qu, memo) {
        return this.eos.transact({
            actions: [{
                account: assetCreator,
                name: 'transfer',
                authorization: [{
                    actor: this.account.name,
                    permission: this.account.authority
                }],
                data: {
                    from: this.account.name,
                    to: OUR_GAME,
                    quantity: qu,
                    memo: memo
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 60
        });
    }

    Miner.prototype.addasset = function(assetCreator, sym_code, strMinOres, strMaxOres) {
        return this.call_contract('addasset', {
            assetCreator,
            sym_code,
            strMinOres,
            strMaxOres
        });
    };

    Miner.prototype.call_contract = function(name, data) {
        return this.eos.transact({
            actions: [{
                account: OUR_GAME,
                name: name,
                authorization: [{
                    actor: this.account.name,
                    permission: this.account.authority
                }],
                data: data
            }]
        }, {
            blocksBehind: 1,
            expireSeconds: 60
        });
    }

    Miner.prototype.get_table = function(name) {
        return this.rpc.get_table_rows({
            table: name,
            code: OUR_GAME,
            scope: OUR_GAME,
            limit: -1
        });

    }

    Miner.prototype.get_global = function() {
        return this.get_table('global');
    }
    Miner.prototype.get_bet_limits = function() {
        return this.get_table('betlimit');
    }
    Miner.prototype.get_all_results = function() {
        return this.get_table('result');
    }
    Miner.prototype.get_my_results = function() {
        return this.rpc.get_table_rows({
            table: 'result',
            code: OUR_GAME,
            scope: OUR_GAME,
            key_type: 'i64',
            index_position: 2,
            lower_bound: this.account.name,
            upper_bound: this.account.name,
            limit: -1,
        });
    }
    Miner.prototype.get_my_lotteries = function() {
        return this.rpc.get_table_rows({
            table: 'lottery',
            code: OUR_GAME,
            scope: OUR_GAME,
            key_type: 'i64',
            index_position: 2,
            lower_bound: this.account.name,
            upper_bound: this.account.name,
            limit: -1,
        });
    }

    Miner.prototype.get_pool_balance = function() {
        var that = this;
        var fn = async () => {
            var balance1 = await that.rpc.get_table_rows({
                table: 'accounts',
                code: 'eosio.token',
                scope: OUR_GAME,
                limit: -1,
            });
            var balance2 = await that.rpc.get_table_rows({
                table: 'accounts',
                code: 'lmtokenowner',
                scope: OUR_GAME,
                limit: -1,
            });
            balance1.rows = balance1.rows.concat(balance2.rows);
            return balance1;
        }
        return fn();
    }

    Miner.prototype.get_my_balance = function() {
        var that = this;
        var fn = async () => {
            var balance1 = await that.rpc.get_table_rows({
                table: 'accounts',
                code: 'eosio.token',
                scope: this.account.name,
                limit: -1,
            });
            var balance2 = await that.rpc.get_table_rows({
                table: 'accounts',
                code: 'lmtokenowner',
                scope: this.account.name,
                limit: -1,
            });
            balance1.rows = balance1.rows.concat(balance2.rows);
            return balance1;
        }
        return fn();
    }

    Miner.prototype.get_my_bets = function() {
        return this.rpc.get_table_rows({
            table: 'betshadow',
            code: OUR_GAME,
            scope: OUR_GAME,
            key_type: 'i64',
            index_position: 2,
            lower_bound: this.account.name,
            upper_bound: this.account.name,
        });
    }

    Miner.prototype.get_record_by_turnid = function(turnid) {
        return this.rpc.get_table_rows({
            table: 'betshadow',
            code: OUR_GAME,
            scope: OUR_GAME,
            key_type: 'i64',
            lower_bound: turnid,
            upper_bound: turnid,
            index_position: 3
        });
    }

    Miner.prototype.get_prizepool = function() {
        return this.get_table('prizepool');
    }

    return Miner;
})();