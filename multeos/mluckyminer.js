(function(window, undefined) {
    'use strict';
    /*配置信息*/
    var ua = navigator.userAgent.toLowerCase(),
        gamename = 'luckyeosminer',
        scatter,
        MINER,
        eos;
    var interfaceDebug = (isDev ? '?debug=1' : '');
    /*
    接口相关配置
     */
    var oInterface = {
        getData: "/" + gamename + "/multeos/info" + interfaceDebug, //获得各种信息接口
        getPep: "/" + gamename + "/multeos/crypto" + interfaceDebug, //单独获取用户资产 
        getUserinfo: "/" + gamename + "/multeos/get-userinfo" + interfaceDebug, //获取用户信息 
        getHistory: "/" + gamename + "/multeos/history" + interfaceDebug, //开奖历史
        getUserHistory: "/" + gamename + "/multeos/user-history" + interfaceDebug, //用户投入历史
        getAwardStatus: "/" + gamename + "/multeos/awardstatus" + interfaceDebug, //排行榜状态
        getAward: "/" + gamename + "/multeos/award" + interfaceDebug, //排行榜实时数据
        getAwardList: "/" + gamename + "/multeos/awardlist" + interfaceDebug, //排行榜结算数据
        getblockId: "/" + gamename + "/multeos/block-id" + interfaceDebug, //获得最新的block-id
        getNotice: "/" + gamename + "/multeos/notice" + interfaceDebug, //获得公告
        getIsThereNotice: "/" + gamename + "/multeos/new-notice" + interfaceDebug, //是否有未读公告
        setReadNotice: "/" + gamename + "/multeos/read-notice" + interfaceDebug, //标记已读公告
        getWeekWorking: "/" + gamename + "/weekend/working" + interfaceDebug, //week是否进行中
        getWeekList: "/" + gamename + "/weekend/list" + interfaceDebug, //week投入记录
        getWeekAwardList: "/" + gamename + "/weekend/award-list" + interfaceDebug, //已经开奖列表
        getResultByHash: "/" + gamename + "/multeos/result" + interfaceDebug, //根据区块hash获得开奖结果
        getShareCode: "/" + gamename + "/multeos/get-code" + interfaceDebug, //获得分享码
        getLastround: "/" + gamename + "/multeos/info" + interfaceDebug, //获得上局统计
        broastTrans: "/" + gamename + "/multeos/broast-trans" + interfaceDebug, //广播
        getTransidBytrans: "/" + gamename + "/multeos/trans" + interfaceDebug, //根据txid获取trans
        platformList: "/" + gamename + "/multeos/platform-list" + interfaceDebug, //项目方账号列表
        getBetRank: "/" + gamename + "/multeos/top-bet" + interfaceDebug, //投注排行榜
        getAwardRank: "/" + gamename + "/multeos/top-award" + interfaceDebug, //收益排行榜  https://game.luckyminer.one
    };

    var originConfig = [{
            name: 'EosWallet',
            url: 'http://www.etwallet.io/?ref=luckyminer',
            ref: 'eostokenpark',
        },
        {
            name: 'TokenPocket',
            url: 'https://www.tokenpocket.pro/?ref=luckyminer',
            ref: 'Tokenpocket',
        },
        {
            name: 'Meet.one',
            url: 'https://meet.one/?ref=luckyminer',
            ref: 'meetone',
        }
    ];
    var originRef = Common.getUrlParam('ref');
    var debugswitch = Common.getUrlParam('debug');

    var EOS_CONFIG;
    var network;
    var ConfigNodePool;
    var eos_rpc;
    var PRECISON = 10000;
    ScatterJS.plugins(new ScatterEOS());
    var CONTRACT_NAME;

    if (isDev) {
        // CONTRACT_NAME = 'luckyminers1';
        CONTRACT_NAME = 'luckymultisc';
        EOS_CONFIG = {
            eosOptions: {},
            eosTo: CONTRACT_NAME,
            getInfo: "/v1/chain/get_info",
        };
        network = {
            blockchain: 'eos',
            protocol: 'https',
            // host: 'api-kylin.eosasia.one',
            host: 'api.jungle.alohaeos.com',
            port: 443,
            // chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
            chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
        };
        ConfigNodePool = [{
                blockchain: 'eos',
                protocol: 'https',
                // host: 'api-kylin.eosasia.one',`
                host: 'api.jungle.alohaeos.com',
                port: 443,
                // chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
                chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
                name: 'alohaeos',
                delay: 0,
            },
            {
                blockchain: 'eos',
                protocol: 'https',
                // host: 'api-kylin.eosasia.one',
                host: 'jungle.eosphere.io',
                port: 443,
                // chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
                chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
                name: 'eosphere',
                delay: 0,
            },
        ];
    } else {
        CONTRACT_NAME = 'luckyminersh';
        EOS_CONFIG = {
            eosOptions: {},
            eosTo: CONTRACT_NAME,
            getInfo: "/v1/chain/get_info",
        };

        network = {
            blockchain: 'eos',
            protocol: 'https',
            host: "luckyminer.one",
            port: 443,
            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        }
        ConfigNodePool = [{
                protocol: "https",
                blockchain: "eos",
                host: "luckyminer.one",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'luckyminer',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "mainnet.meet.one",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'meetone',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "eos.newdex.one",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'newdex',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "api.helloeos.com.cn",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'helloeos',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "api.eossweden.se",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'eossweden',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "mainnet.eoscannon.io",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'eoscannon',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "nodes.get-scatter.com",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'scatter',
                delay: 0,
            },
            {
                protocol: "https",
                blockchain: "eos",
                host: "eos.greymass.com",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
                name: 'greymass',
                delay: 0,
            },
        ];
    }


    var NodePool = ConfigNodePool.concat();
    var nodePoolReqTime = [];
    var curNodePoolIndex = 0;
    var curNodePoolErrNum = 0;
    var nodePoolErrMax = 3;
    var nodePoolConfirm = false;
    let _network = ScatterJS.Network.fromJson(NodePool[curNodePoolIndex]);
    console.log(_network)
    const Api = eosjs_api.default;
    const JsonRpc = eosjs_jsonrpc.default;
    eos_rpc = new JsonRpc(_network.fullhost());
    /*
    定时器相关配置
     */
    var oTimeout = {
        getData: null,
        timeDown: null,
        getNewBlockId: null,
        ranktimeDown: null,
        rankRefresh: null,
        getPep: null,
        getHistory: null,
        getLastround: null,
    };

    /*
    计数器
     */
    var oNum = {
        reqErrDataRender: 0,
    };

    var mainCon = new Vue({
        el: '#guess',
        data: {
            isLogin: false,
            /** [game data] */
            roundId: 0,
            turnId: 0,
            round: 0,
            typeId: 1,
            sta: 0,
            result: 1,
            resultDist: {},
            whileList: [],
            defaultGas: 0.01,
            waitCut: false,
            myturnCookieKey: 'mluckyeosminer_turn',
            shareCode: '',
            crypto: 0,
            my: 0,
            pool: 0,
            timeLft: 0,
            supmul: 40,
            turncost: 0.20,
            changecost: 0.5,
            turncostArr: [0, 0, 0, 0],
            turnDefault: 0.5,
            turnMax: 100.00,
            turnRoundMax: 100.00,
            turninBlock: 150,
            turnallowturnBlock: 110,
            turnMin: 0.5,
            updateCrytoTid: null,
            activeIdList: {},
            curTurnId: '',
            isRevealing: false,
            curNodePoolIndex: curNodePoolIndex,

            startBlockNum: 0,
            curBlockNum: 0,
            lockBlockNum: 0,
            openBlockNum: 0,
            realLockBlockNum: 0, //真实允许被投入的区块数
            delayOpenGemBlockNum: 30,
            beforelockBlockNum: 5,
            showWaitCutId: 0,
            baseTurnid: 2000000,

            lastround: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },
            thisround: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },
            turn: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },
            myturn: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },

            canUseVoucherCode: '',
            voucherList: [],
            /** [game history] */
            showhistorylength: 10,
            showuserhistorylength: 10,
            history: [],
            userHistory: [],
            curVarUserHistory: {
                'settlement_block': '{}'
            },
            curVarHistory: {
                'settlement_block': '{}'
            },

            /** [game rank] */
            rankStatus: null, //排行榜状态，-1：未开始，0：准备中，1：进行中，2：结算中，3：结束
            rankLeft: null, //离开始（或结束）还有剩余时间，单位s
            rankTimeLeft: null,
            rankMy: null, //我的指数（排行指数）
            rankId: null, //排行榜日期
            rankList: [],
            nrankList: [],
            /** [game week] */
            weekAward: 0,
            weekList: [],
            weekStatus: null,
            weekHaveAward: false,
            weekAwardTime: null,
            weekAwardList: [],
            weekAwardBlockInfo: null,
            /** [game notice] */
            noticeList: [],
            betrankList: [],
            awardrankList: [],
            noticeNotice: null,
            noticeTime: null,
            noticeTitle: null,
            identity: {},

            /** [game status] */
            isRe: false,
            isGemHint: false,
            lsround: false,
            isTimeDown: false,
            isShowWaitBegin: false,
            ischarging: false,
            isOpenSound: true,
            isWaitGettrans: false,
            lockGetVoucher: false,

            /** [pop isvisible] */
            isShowMain: false,
            isShowLoading: false,
            isShowHelpHint: false,
            isShowGetGemPop: false,
            isShowNGetGemPop: false,
            isShowWaitCut: false,
            isShowCountDown: false,
            isShowPoptip: false,
            isShowRecharge: false,
            isShowErrPop: false,
            isShowMaxGemPop: false,
            isShowRechargePop: false,
            isShowSharePop: false,
            isShowLoadingDiv: true,
            isShowCouponPop: false,
            isUseVoucherPoptip: false,
            isShowAutoTapTotast: false,
            isShowOwnList: false,
            isShowCryptoList: false,
            isShowCiconlist: false,
            isShowHistory: true,
            isShowUserHistory: false,
            isShowValidatePop: false,
            isShowHValidatePop: false,
            isShowChooseLang: false,
            isShowRankPop: false,
            isShowBetRankPop: false,
            isShowAwardRankPop: false,
            isShowNoticePop: false,
            isShowNoticeRedDot: false,
            isShowActPop: false,
            isShowActListPop: false,
            isShowLockCountDown: false,
            isShowQrCode: false,
            isShowNodeList: false,
            isShowPerCenter: false,
            isShowVerPop: false,
            isShowContactPop: false,

            /** [game text] */
            textPoptip: '',
            textErrtip: '',
            textMaxGemtip: '',
            textTipResult: lang_msgntip,
            textNotice: lang_msgtip,
            textUseVoucherPoptip: '',

            /** [eos-res] */
            schRam: '0%',
            schCpu: '0%',

            /** [game config] */
            jewelcnf: {
                1: 'i-jewel-red',
                2: 'i-jewel-green',
                3: 'i-jewel-blue',
                4: 'i-jewel-purple',
            },
            resultConfig: {
                1: lang_Iron,
                2: lang_Silver,
                3: lang_Gold,
                4: lang_Dimond,
            },
            timesConfig: {
                1: 2,
                2: 3,
                3: 6,
                4: 50,
            },
            defaultAutoTapCnf: {
                '1': 0.5,
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0
            },
            defaultTurnCostArr: [0, 0, 0, 0],
            nodeList: NodePool,
            curNode: 0,

            /***wzk */
            dividends: 0, //控制分红显示的tab切换
            dividendsShow: false, //控制分红页面的显隐
            dividendsmodule: 0, //分红页面tab
            autoTap: false, //开启自动下注
            hasauotoTap: false, //已经确认过开启自动下注
            autoturn: {
                1: 0.20,
                2: 0,
                3: 0,
                4: 0
            }, //自动投入金额，默认全是0.5 0 0 0
            autotimes: 1.00.toFixed(2), //倍投倍率
            autoBetLock: false,
            betLock: false,
            hasTapNum_auto: -1, //已经自动下注的局次
            winAfterCancell: false,
            showAutoInfo: false, //切换自动下注弹窗显示隐藏
            /***wzk */
            lang_roundboard: lang_roundboard,
            lang_Iron: lang_Iron,
            lang_Dimond: lang_Dimond,
            lang_Gold: lang_Gold,
            lang_Silver: lang_Silver,
            lang_startblock: lang_startblock,
            lang_lockblock: lang_lockblock,
            lang_lotteryblock: lang_lotteryblock,
            lang_lotteryhash: lang_lotteryhash,
            lang_time: lang_time,
            lang_result: lang_result,
            lang_Awarded: lang_Awarded,
            lang_inthedraw: lang_inthedraw,
            lang_tobeawarded: lang_tobeawarded,
            PRECISON: PRECISON,
            curVarBlockHash: '',
            openBlocktime: {},
        },
        created: function() {
            this.isShowMain = true;
            this.isShowLoadingDiv = false;
            this.getNewBlockId();
            this.getHistory();
            this.getAccountPool();
            this.initRequestAni();
            this.initClipboard();
            this.initHashClipboard();

            // this.getUserHistory();
            this.getAwardStatus();
            this.getIsThereNotice();
            this.getTurnByTurnid();
            this.getPlatformList();
            Vue.http.options.timeout = 5000;


            if (debugswitch) this.loadVconsole();
        },
        computed: {
            reverseround: function() {
                if (!this.history)
                    return '';
                return this.history.slice(0, 30);
            },
            showhistory: function() {
                if (!this.history)
                    return [];
                return this.history.slice(0, this.showhistorylength);
            },
            showuserHistory: function() {
                if (!this.userHistory)
                    return [];
                return this.userHistory.slice(0, this.showuserhistorylength);
            },
            isShowHistoryLoading: function() {
                if (this.history.length > this.showhistorylength && this.isShowHistory) {
                    return true;
                } else {
                    return false;
                }
            },
            isShowUserHistoryLoading: function() {
                if (this.userHistory.length > this.showuserhistorylength && this.isShowUserHistory) {
                    return true;
                } else {
                    return false;
                }
            },
            floatMy: function() {
                return genFloat(this.my || 0);
            },
            getPool: function() {
                return (this.pool < 1000000 ? genFloat(this.pool).toFixed(2) : (genFloat(this.pool).toFixed(2) / 1000).toFixed(2) + 'k ');
            },
            countDownBlock: function() {
                if (this.lockBlockNum === 0 || this.curBlockNum === 0) {
                    return 0;
                }
                return (this.lockBlockNum - this.curBlockNum > 0 ? this.lockBlockNum - this.curBlockNum : 0)
            },
            lockDownBlock: function() {
                if (this.lockBlockNum === 0 || this.curBlockNum === 0) {
                    return 0;
                }
                return (this.realLockBlockNum - this.curBlockNum > 0 ? this.realLockBlockNum - this.curBlockNum : 0)
            },
            curVarUserHistoryBlockHash: function() {
                return this.curVarUserHistory['settlement_block'] && JSON.parse(this.curVarUserHistory['settlement_block']).blockHash;
            },
            curVarHistoryBlockHash: function() {
                return this.curVarHistory['settlement_block'] && JSON.parse(this.curVarHistory['settlement_block']).blockHash;
            },
            curVarHistoryBlockTime: function() {
                return this.curVarHistory['settlement_block'] && JSON.parse(this.curVarHistory['settlement_block']).blockTime * 1000;
            },
            curVarHistoryBlockLotId: function() {
                return this.curVarHistory['settlement_block'] && JSON.parse(this.curVarHistory['settlement_block']).blockId;
            },
            rankT1: function() {
                switch (this.rankStatus) {
                    case -1:
                        return lang_notyetbegun + (this.rankLeft > 0 ? lang_left + Common.formatLeftTimer(this.rankLeft) + lang_start : '');
                    case 0:
                        return lang_inPreparation + '...';
                    case 1:
                        return lang_inprogress + Common.formatLeftTimer(this.rankLeft);
                    case 2:
                        return lang_settlement + '...';
                    case 3:
                        return lang_listwinner;
                }
            },
            rankTime: function() {
                if (this.rankId) {
                    if (this.rankStatus == 1 || this.rankStatus == 2) {
                        return lang_thisrank + '  ' + lang_date + '：' + this.rankId;
                    } else {
                        return lang_lastrank + '  ' + lang_date + '：' + this.rankId;
                    }
                } else {
                    return lang_comesoon;
                }
            },
            isHaveActiveAct: function() {
                if (this.activeIdList[1] || this.activeIdList[2]) {
                    return true;
                }
                return false;
            },
            isOpengem() {
                if (this.curBlockNum >= (this.openBlockNum + this.delayOpenGemBlockNum) && (this.openBlockNum !== 0)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch: {
            sta: function() {
                if (this.sta === 0) {
                    this.betLock = false;
                    this.setTurnDefault();
                    this.getPep();
                } else if (this.sta === 2 || this.sta === 3 || this.sta === 4) {
                    if (this.updateCrytoTid !== this.turnId) {
                        this.updateCrytoTid = this.turnId;
                        this.getPep();
                    }
                }
            },
            turnId: function() {
                this.setTurnDefault();
                this.getMyBet();
                this.getHistory();
                this.getPep();
                this.hideGetGemPop();
                this.resetTurn();
                this.getAccountPool();
                this.getLastround();
            },
            rankTimeLeft: function() {
                this.rankLeft = this.rankTimeLeft;
                this.rankTimeDown();
            },
            autoTap: function(val, old) {
                if (val) {
                    this.hasTapNum_auto = this.turnId;
                    this.showAutoInfo = true;
                    //mytrun[]当前下注金额
                } else {
                    this.hasauotoTap = false;
                    this.hasTapNum_auto = -1;
                    this.showAutoInfo = false;
                    this.$refs.minerswitch.checked = false
                }
            },
            isShowRankPop: function() {},
            rankList: function() {
                this.nrankList = this.rankList.concat();
                for (var i = 0; i < this.nrankList.length; i++) {
                    if (this.nrankList[i].rank == 0) {
                        var tmp = this.nrankList.splice(i, 1);
                        this.nrankList.push(tmp[0]);
                        return;
                    }
                }
            },
            curBlockNum: function() {
                if (this.curBlockNum > this.lockBlockNum) {
                    if (this.curBlockNum >= this.openBlockNum + this.delayOpenGemBlockNum) {
                        this.isShowLockCountDown = false;
                        this.isShowWaitBegin = true;
                    } else {
                        this.isShowLockCountDown = true;
                        this.isShowWaitBegin = false;
                    }
                    this.isShowCountDown = false;
                } else {
                    this.isShowWaitBegin = false;
                    this.isShowLockCountDown = false;
                    this.isShowCountDown = true;
                }
            }
        },
        filters: {},
        methods: {
            setTurnDefault: function() {
                this.$set(this.turncostArr, 0, this.defaultTurnCostArr[0]);
                this.$set(this.turncostArr, 1, this.defaultTurnCostArr[1]);
                this.$set(this.turncostArr, 2, this.defaultTurnCostArr[2]);
                this.$set(this.turncostArr, 3, this.defaultTurnCostArr[3]);
            },

            /*矿石投入*/
            gemTap: function(_typeid) {
                var self = this;
                var realLockBlockNum = self.realLockBlockNum;
                self.curtxid = null;
                self.isWaitGettrans = false;
                if (self.isLogin) {
                    var memo = self.getMemo();
                    //如果当前区块>锁定区块则取消交易
                    if (self.curBlockNum >= self.lockBlockNum) {
                        self.popTip(lang_betfail);
                        return;
                    }

                    if (memo[1] <= 0) {
                        self.popTip(lang_errquota);
                        return;
                    }

                    if (memo[1] > self.crypto - self.defaultGas) {
                        self.popTip(lang_insufficientfuns);
                        return;
                    }

                    for (var i = 0; i < self.turncostArr.length; i++) {
                        if ((self.turncostArr[i] + self.myturn[i + 1]) > self.turnRoundMax) {
                            self.popTip(lang_maximunturn + self.turnRoundMax);
                            return
                        }
                    }
                    if (self.betLock) {
                        self.popTip(lang_waitturn);
                        return;
                    }
                    self.betLock = true;
                    self.showLoading();
                    eos.transaction({
                        actions: [{
                            account: 'eosio.token',
                            name: 'transfer',
                            authorization: [{
                                actor: self.identity.name,
                                permission: self.identity.authority,
                            }],
                            data: {
                                from: self.identity.name,
                                to: EOS_CONFIG.eosTo,
                                quantity: memo[1] + ' EOS',
                                memo: 'mine:' + memo[0] + ';' + self.turnId,
                            }
                        }]
                    }, {
                        broadcast: false,
                        sign: true,
                        expireSeconds: 30
                    }).then(res => {
                        console.log(res, typeof res.transaction.signatures[0], '3123123213');
                        self.pushTrans({
                            trans: res.transaction,
                            isFirst: true
                        });
                        self.broastTrans(res.transaction); //给后台
                    }).catch(err => {
                        console.error(err, '1111111');
                        self.betLock = false;
                        self.completeLoading();
                        err && err.error && self.popTip(err.error.what);
                    });
                } else {
                    self.logingScatter();
                }
            },
            pushTrans(data) {
                var self = this;
                var realLockBlockNum = self.realLockBlockNum;
                eos.pushTransaction(data.trans).then(res => {
                    console.log(`call mine contract success`, res);
                    if (res.processed.block_num >= realLockBlockNum) {
                        self.pushTranFail();
                    } else {
                        //在链上找交易id
                        // setTimeout(self.getTranscation, 3000, { txid: res.transaction_id, isScatter: true });
                        //再次push 如果报错则写入成功
                        setTimeout(self.pushTrans, 3000, {
                            trans: data.trans,
                            isFirst: false
                        });
                    }
                }).catch(err => {
                    console.log(err, 132213213);
                    if (!data.isFirst) {
                        self.pushTranSuc();
                    } else {
                        self.isWaitGettrans = true;
                        if (self.curtxid) {
                            // setTimeout(self.getTranscation, 3000, { txid: self.curtxid });
                            //再次push 如果报错则写入成功
                            setTimeout(self.pushTrans, 3000, {
                                trans: data.trans,
                                isFirst: false
                            });
                        }
                    }
                });
            },
            pushTranFail() {
                var self = this;
                self.popTip(lang_betfail2);
                self.getUserHistory();
                self.getPep();
                self.setTurnDefault();
                self.betLock = false;
                self.getTurnByTurnid();
                self.completeLoading();
            },
            pushTranSuc() {
                var self = this;
                self.popTip(lang_betsuc);
                setTimeout(function() {
                    self.getMyBet(1);
                }, 500);
                self.getUserHistory();
                self.getPep();
                self.setTurnDefault();
                self.betLock = false;
                self.getTurnByTurnid();
                self.completeLoading();
            },
            getTranscation(data) {
                var self = this;
                //https://nodes.get-scatter.com
                self.$http.post("https://luckyminer.one/v1/history/get_transaction", {
                        id: data.txid
                    }, {
                        emulateJSON: true
                    })
                    .then(function(res) {
                        console.log(res, 'find txid')
                        if (res.body.code === 500) {
                            self.pushTranFail();
                        } else {
                            self.pushTranSuc();
                        }
                    }, function(err) {
                        console.log(data.isScatter, self.curtxid, err, 'gettranscation err');
                        if (data.isScatter) {
                            self.isWaitGettrans = true;
                            if (self.curtxid) {
                                setTimeout(self.getTranscation, 3000, {
                                    txid: self.curtxid
                                });
                            }
                        } else {
                            self.pushTranFail();
                        }
                    });
            },
            broastTrans(data) {
                var self = this;
                var _data = {};
                _data.compression = 0;
                _data.signatures = data.signatures;
                _data.packed_context_free_data = '';
                _data.transaction = data.transaction;
                self.$http.post(oInterface.broastTrans, _data, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                        self.curtxid = ret.body.data.txid;
                        //如果scatter广播失败。则再次查询是否广播成功
                        if (self.isWaitGettrans) {
                            // setTimeout(self.getTranscation, 3000, { txid: self.curtxid });
                            //再次push 如果报错则写入成功
                            setTimeout(self.pushTrans, 3000, {
                                trans: data,
                                isFirst: false
                            });
                        }
                    }, function(err) {
                        setTimeout(self.broastTrans, 3000, data);
                    });
            },
            getTransidBytrans() {
                var self = this;
                if (self.curtxid) {
                    self.$http.get(oInterface.getTransidBytrans + '?transid=' + self.curtxid, {}, {
                            emulateJSON: true
                        })
                        .then(function(ret) {
                            console.log(ret.body.data.txid, 'txid');
                            if (ret.body.data.txid) {
                                setTimeout(self.getTranscation, 3000, {
                                    txid: ret.body.data.txid
                                });
                            } else {
                                self.pushTranFail();
                            }
                        }, function(err) {
                            setTimeout(self.getTransidBytrans, 3000, self.curtxid);
                        });
                }
            },
            arrayToHex(data) {
                var result = '';
                for (var x of data) {
                    result += ('00' + x.toString(16)).slice(-2);
                }
                return result;
            },
            renderMyturn: function(data) {
                var lastBetData;
                lastBetData = data;
                if (lastBetData.length > 0) {
                    this.myturn = this.formatturnAmount(lastBetData);
                } else {
                    this.myturn = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0
                    };
                }
            },
            renderTurn: function(turn) {
                this.turn = turn || {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                };
            },
            formatturnAmount: function(data) {
                var res = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                };
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].bet.amount.length; j++) {
                        if (this.openBlocktime[data[i].turn_id] && parseInt(data[i].timestamp) > this.openBlocktime[data[i].turn_id]) {
                            continue;
                        }
                        if (this.turnId !== data[i].turn_id) {
                            continue;
                        }
                        res[j + 1] += data[i].bet.amount[j];
                    }
                }
                for (var index in res) {
                    res[index] = res[index] / PRECISON;
                }
                return res;
            },
            getMyBet: function(isBetCallbackNum, callback) {
                var self = this;
                self.isLogin && eos_rpc.get_table_rows({
                    table: 'betshadow',
                    code: EOS_CONFIG.eosTo,
                    scope: EOS_CONFIG.eosTo,
                    key_type: 'i64',
                    index_position: 2,
                    lower_bound: self.identity.name,
                    upper_bound: self.identity.name,
                }).then(function(data) {
                    console.log('getmybetsuc', data);
                    if (isBetCallbackNum > 0 && isBetCallbackNum < 4 && data.rows == 0) {
                        setTimeout(function() {
                            isBetCallbackNum++;
                            self.getMyBet(isBetCallbackNum);
                        }, 1000);
                    }
                    self.renderMyturn(data.rows);
                    callback && callback();
                }).catch(function(err) {
                    console.log('getmybetfail', err);
                    if (isBetCallbackNum > 0 && isBetCallbackNum < 4) {
                        setTimeout(function() {
                            isBetCallbackNum++;
                            self.getMyBet(isBetCallbackNum);
                        }, 1000);
                    }
                    self.renderMyturn([]);
                    callback && callback();
                });
            },
            getLastround: function() {
                var self = this;
                clearTimeout(oTimeout.getLastround);
                if (document.visibilityState == 'hidden') {
                    return;
                }
                self.$http.post(oInterface.getLastround, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                        var data = ret.body.data;
                        switch (ret.body.r) {
                            case 0:
                                self.setLastround(data);
                                break;
                            default:
                        }
                    }, function(err) {
                        oTimeout.getLastround = setTimeout(self.getLastround, 3000);
                    });
            },
            setLastround: function(data) {
                var _lastround = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0
                    },
                    _thisround = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0
                    };
                for (var l in data.lastround) {
                    _lastround[data.lastround[l]]++;
                }
                for (var t in data.thisround) {
                    _thisround[data.thisround[t]]++;
                }
                this.lastround = _lastround;
                this.thisround = _thisround;
            },
            getMemo: function() {
                var arr = [],
                    all = 0;
                for (var i = 0; i < 4; i++) {
                    all += parseFloat(this.turncostArr[i]);
                    arr[i] = parseFloat(this.turncostArr[i]);
                }
                all = all.toFixed(4);
                return [arr.join(','), all];
            },

            /*获得用户余额*/
            getPep: async function() {
                var self = this;
                clearTimeout(oTimeout.getPep);
                if (document.visibilityState == 'hidden') {
                    return;
                }
                self.isLogin && eos_rpc.get_table_rows({
                    table: 'accounts',
                    code: 'eosio.token',
                    scope: self.identity.name,
                    limit: -1,
                }).then(
                    eosbalance => {
                        self.crypto = parseFloat(eosbalance.rows[0].balance) || 0;
                        oTimeout.getPep = setTimeout(self.getPep, 10000);
                    }
                ).catch(e => {
                    console.log(e);
                    oTimeout.getPep = setTimeout(self.getPep, 10000);
                });
            },
            getBlockId: function(blockId, _callback) {
                var self = this;
                eos_rpc.get_block(blockId).then(function(data) {
                    _callback(data);
                });
            },
            getNewBlockId: function(errNum) {
                var self = this;
                clearTimeout(oTimeout.getNewBlockId);
                if (document.visibilityState == 'hidden') {
                    return;
                }
                var reqStime = (new Date()).getTime();
                var url;
                if (errNum > 10) {
                    url = self.nodeList[self.curNodePoolIndex].protocol + '://' + self.nodeList[self.curNodePoolIndex].host + EOS_CONFIG.getInfo;
                } else {
                    url = "/luckyeosminer/multeos/block-id";
                }
                self.$http.get(url, {}, {
                        emulateJSON: true,
                        timeout: 500
                    })
                    .then(function(res) {
                        var blockid;
                        var blocknum;
                        if (errNum > 10) {
                            blockid = res.body.head_block_id;
                            blocknum = res.body.head_block_num;
                        } else {
                            blockid = res.body.data.blockid;
                            blocknum = res.body.data.blocknum;
                        }
                        oTimeout.getNewBlockId = setTimeout(self.getNewBlockId, 500);
                        // !nodePoolConfirm && self.colReqTime(reqStime);
                        self.curBlockNum = blocknum;
                        self.realLockBlockNum = blocknum - blocknum % self.turninBlock + self.turnallowturnBlock;
                        self.lockBlockNum = self.realLockBlockNum - self.beforelockBlockNum;
                        self.openBlockNum = self.realLockBlockNum + 1;
                        self.curBlockId = blockid;
                        self.turnId = Math.floor(blocknum / self.turninBlock) + self.baseTurnid;
                        //当前区块大于开奖区块 也就是开奖阶段
                        if (self.isOpengem) {
                            //如果当前没有开过奖
                            if (!self.resultDist[self.turnId]) {
                                if (self.waitCut) {
                                    return;
                                }
                                self.waitCut = true;
                                self.isShowCountDown = false;
                                self.isShowLockCountDown = false;
                                self.isShowWaitBegin = true;
                                self.getBlockId(self.openBlockNum, function(data) {
                                    self.getResult(data.id);
                                });
                            }
                        }
                        if (self.curBlockNum >= self.openBlockNum && !self.openBlocktime[self.turnId]) {
                            self.getBlockId(self.realLockBlockNum, function(data) {
                                self.openBlocktime[self.turnId] = Date.parse(new Date(data.timestamp + 'Z'));
                            });
                        }

                    }, function(err) {
                        if (errNum > 0) {
                            errNum++;
                        } else {
                            errNum = 1;
                        }
                        console.log('request newblockid err');
                        oTimeout.getNewBlockId = setTimeout(self.getNewBlockId, 0, errNum);
                        // self.catchEosNodeErr();
                    });
            },
            // colReqTime(reqStime) {
            //     var self = this;
            //     nodePoolReqTime[curNodePoolIndex] || (nodePoolReqTime[curNodePoolIndex] = []);
            //     if (nodePoolReqTime[curNodePoolIndex].length < 3) {
            //         nodePoolReqTime[curNodePoolIndex].push((new Date()).getTime() - reqStime);
            //     }
            //     if (nodePoolReqTime[curNodePoolIndex].length >= 3) {
            //         curNodePoolIndex++;
            //         if (nodePoolReqTime.length >= NodePool.length) {
            //             curNodePoolIndex = self.reqAvg();
            //             nodePoolConfirm = true;
            //         }
            //     }
            // },
            // reqAvg() {
            //     var resIndex = null;
            //     for (var i = 0, minReq = null, curReq; i < nodePoolReqTime.length; i++) {
            //         curReq = 0;
            //         for (var j = 0; j < nodePoolReqTime[i].length; j++) {
            //             curReq += nodePoolReqTime[i][j];
            //         }
            //         if (!minReq || minReq > curReq) {
            //             minReq = curReq;
            //             resIndex = i;
            //         }
            //     }
            //     nodePoolReqTime = [];
            //     return resIndex;
            // },
            // catchEosNodeErr() {
            //     curNodePoolErrNum++;
            //     if (curNodePoolErrNum >= nodePoolErrMax) {
            //         nodePoolConfirm = false;
            //         curNodePoolErrNum = 0;
            //         NodePool.splice(curNodePoolIndex, 1);
            //         if (NodePool.length === 0) NodePool = ConfigNodePool.concat();
            //         curNodePoolIndex = 0;
            //     }
            // },
            getHistory: function() {
                var self = this;
                clearTimeout(oTimeout.getHistory);
                if (document.visibilityState == 'hidden') {
                    return;
                }
                self.$http.post(oInterface.getHistory, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.history = data.data;
                                    break;
                                default:
                            }
                            oTimeout.getHistory = setTimeout(self.getHistory, 3000);
                        },
                        function(err) {
                            oTimeout.getHistory = setTimeout(self.getHistory, 3000);
                        });
            },
            getUserHistory: function() {
                var self = this;
                self.$http.post(oInterface.getUserHistory, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.userHistory = data.data;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            //是否有新消息
            getIsThereNotice: function() {
                var self = this;
                self.$http.post(oInterface.getIsThereNotice, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                        switch (ret.body.r) {
                            case 0:
                                self.isShowNoticeRedDot = true;
                                break;
                            default:
                        }
                    });
            },
            //获取分享码
            getShareCode: function() {
                var self = this;
                if (this.shareCode) {
                    return;
                }
                self.$http.post(oInterface.getShareCode, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                        switch (ret.body.r) {
                            case 0:
                                self.shareCode = ret.body.data.code;
                                break;
                            default:
                        }
                    });
            },
            //设置新消息已读
            setReadNotice: function() {
                var self = this;
                self.$http.post(oInterface.setReadNotice, {}, {
                    emulateJSON: true
                }).then(function() {
                    self.isShowNoticeRedDot = false;
                });
            },


            getAwardStatus: function() {
                var self = this;
                self.$http.post(oInterface.getAwardStatus, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.rankStatus = data.status;
                                    self.rankMy = data.my;
                                    if (self.rankStatus === 1 || self.rankStatus === 2) {
                                        self.$set(self.activeIdList, 1, true);
                                        self.getAward();
                                    } else {
                                        if (self.activeIdList[1]) self.$set(self.activeIdList, 1, null);
                                        self.getAwardList();
                                    }
                                    self.rankId = data.id;
                                    self.rankTimeLeft = data.left;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            getAward: function() {
                var self = this;
                self.$http.post(oInterface.getAward, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.rankMy = data.my;
                                    self.rankList = data.top;
                                    self.rankTimeLeft = data.left;
                                    self.rankId = data.id;
                                    self.rankStatus = data.status;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            getAwardList: function() {
                var self = this;
                self.$http.post(oInterface.getAwardList, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.rankMy = data.my;
                                    self.rankList = data.top;
                                    self.rankTimeLeft = data.left;
                                    self.rankId = data.id;
                                    self.rankStatus = data.status;
                                    break;
                                default:
                            }
                        },
                        function(err) {

                        });
            },
            getNotice: function() {
                var self = this;
                self.$http.post(oInterface.getNotice, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.noticeList = data.list;
                                    self.noticeNotice = data.notice;
                                    self.noticeTime = data.time;
                                    self.noticeTitle = data.title;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            getBetRank: function() {
                var self = this;
                self.$http.get(oInterface.getBetRank, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.betrankList = data;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            getAwardRank: function() {
                var self = this;
                self.$http.get(oInterface.getAwardRank, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.awardrankList = data;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            getWeekWorking: function() {
                var self = this;
                self.$http.post(oInterface.getWeekWorking, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            self.weekStatus = ret.body.r;
                            if (self.weekStatus !== 0) {
                                self.getWeekAwardList();
                                if (self.activeIdList[2]) self.$set(self.activeIdList, 2, null);
                            } else {
                                self.$set(self.activeIdList, 2, true);
                            }
                        },
                        function(err) {});
            },
            getWeekList: function(page) {
                var self = this;
                self.$http.post(oInterface.getWeekList, {
                        page: (page - 1),
                        size: self.pagedisplay,
                    }, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.weekList = data.list || [];
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            getWeekAwardList: function() {
                var self = this;
                self.$http.post(oInterface.getWeekAwardList, {}, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.weekAwardTime = data.date;
                                    self.weekAwardList = data.list || [];
                                    self.weekAwardBlockInfo = data.block_info;
                                    if (data.block_info) {
                                        self.weekHaveAward = true;
                                    }
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            /*倒计时*/
            rankTimeDown: function() {
                clearTimeout(oTimeout.ranktimeDown);
                if (this.rankLeft <= 0)
                    return false;
                this.rankLeft--;
                oTimeout.ranktimeDown = setTimeout(this.rankTimeDown, 1000);
            },
            /*结果页弹层*/
            gem: function() {
                if (this.isOpengem) {
                    this.my = this.getMy();
                    this.isShowNGetGemPop = false;
                    this.isShowGetGemPop = false;

                    if (genFloat(this.my) < 0.01) {
                        if (this.myturn[1] > 0.01 || this.myturn[2] > 0.01 || this.myturn[3] > 0.01 || this.myturn[4] > 0.01) {
                            this.textTipResult = lang_msgntip;
                        } else {
                            this.textTipResult = lang_notpart;
                        }
                        this.isShowNGetGemPop = true;
                        this.isShowGetGemPop = false;
                    } else {
                        this.isShowGetGemPop = true;
                        this.isShowNGetGemPop = false;
                        isDev && console.log(this.my);
                    }
                }
            },
            showHelpHint: function() {
                this.isShowHelpHint = true;
            },
            hideHelpHint: function() {
                this.isShowHelpHint = false;
            },
            popTip: function(msg) {
                this.textPoptip = msg;
                this.isShowPoptip = true;
            },
            hidePoptip: function() {
                this.isShowPoptip = false;
            },
            chooseGems: function(typeId) {
                this.typeId = typeId;
            },
            setTurnDouble: function() {
                if (this.betLock) return;
                this.$set(this.turncostArr, this.typeId - 1, this.turncostArr[this.typeId - 1] * 2);
                if (this.turncostArr[this.typeId - 1] > this.turnMax)
                    this.turncostArr[this.typeId - 1] = this.turnMax;
                this.$set(this.turncostArr, this.typeId - 1, genFloat(this.turncostArr[this.typeId - 1]).toFixed(2));
            },
            setTurnAdd: function() {
                if (this.betLock) return;
                this.$set(this.turncostArr, this.typeId - 1, genFloat(this.turncostArr[this.typeId - 1]) + this.changecost);
                if (this.turncostArr[this.typeId - 1] > this.turnMax)
                    this.turncostArr[this.typeId - 1] = this.turnMax;
                this.$set(this.turncostArr, this.typeId - 1, genFloat(this.turncostArr[this.typeId - 1]).toFixed(2));
            },
            setTurnReduce: function() {
                if (this.betLock) return;
                this.$set(this.turncostArr, this.typeId - 1, this.turncostArr[this.typeId - 1] - this.changecost);
                if (this.turncostArr[this.typeId - 1] < this.turnMin)
                    this.turncostArr[this.typeId - 1] = this.turnMin;
                this.$set(this.turncostArr, this.typeId - 1, genFloat(this.turncostArr[this.typeId - 1]).toFixed(2));
            },
            setTurnMax: function() {
                if (this.betLock) return;
                if (this.crypto - this.defaultGas <= this.turnMin) {
                    return;
                }
                this.$set(this.turncostArr, this.typeId - 1, this.turncostArr[this.typeId - 1] = genFloat(this.turnMax));
                if (this.turncostArr[this.typeId - 1] > this.crypto)
                    this.turncostArr[this.typeId - 1] = this.crypto - this.defaultGas;
                this.$set(this.turncostArr, this.typeId - 1, genFloat(this.turncostArr[this.typeId - 1]).toFixed(2));
            },
            setTurnHalve: function() {
                if (this.betLock) return;
                this.$set(this.turncostArr, this.typeId - 1, this.turncostArr[this.typeId - 1] / 2);
                if (this.turncostArr[this.typeId - 1] < this.turnMin)
                    this.turncostArr[this.typeId - 1] = this.turnMin;
                this.$set(this.turncostArr, this.typeId - 1, genFloat(this.turncostArr[this.typeId - 1]).toFixed(2));
            },
            setTurnReset: function() {
                if (this.betLock) return;
                this.$set(this.turncostArr, this.typeId - 1, 0);
            },
            //移除loading效果
            completeLoading: function() {
                this.isShowLoadingDiv = false;
            },
            //展示loading效果
            showLoading: function() {
                this.isShowLoadingDiv = true;
            },
            //初始化剪切板
            initClipboard: function() {
                var self = this;
                var clipboard = new ClipboardJS('#btn_copyshare');
                clipboard.on('success', function(e) {
                    if (!self.isLogin) {
                        self.popTip(lang_trylogin);
                    } else {
                        self.popTip(lang_repsuc);
                        self.isShowSharePop = false;
                    }
                });
            },
            initHashClipboard: function() {
                var self = this;
                var clipboard = new ClipboardJS('#btn_copyhash');
                clipboard.on('success', function(e) {
                    self.popTip(lang_repsuc);
                });
            },
            //初始化矿工动画
            initAnimate: function() {
                var imgArr = [];
                for (var i = 0, imgLen = 13; i < imgLen; i++) {
                    imgArr.push('/img/jewel/gemquiz/animate/' + i + '.png');
                }

                loadImage(imgArr, function(newimgArr) {
                    animation(document.getElementById('canvas'), newimgArr);
                });
            },
            hideGetGemPop: function() {
                this.isShowGetGemPop = false;
                this.isShowNGetGemPop = false;
            },
            showSharePop: function() {
                this.isShowSharePop = true;
            },
            hideSharePop: function() {
                this.isShowSharePop = false;
            },
            useAutominer: function() {
                //                let allval = this.autoturn['1'] + this.autoturn['2'] + this.autoturn['3'] + this.autoturn['4']
                //                if (this.$refs.minerswitch.checked && (this.crypto < allval)) {
                //                    this.$refs.minerswitch.checked = false;
                //                    this.autoTap = false;
                //                    this.popTip('余额不足以支持下次自动投入，请先去充值后再来');
                //                    return;
                //                }
                this.autoTap = this.$refs.minerswitch.checked;
            },
            closeAutominer: function() {
                this.$refs.minerswitch.checked = false;
                this.autoTap = false;
            },
            showContact: function() {
                this.popTip('Telegram:https://t.me/LMONE');
            },
            formatDateTime: function(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            verify: function() {
                var value = this.$refs.inputHash.value;
                var self = this;
                if (value) {
                    if (value.toString().length <= 70) {
                        var res = self.crc16(value.toString())
                        self.popTip(res);
                    } else {
                        self.popTip(lang_longhash);
                    }
                }
            },
            clickHistory: function() {
                if (this.isShowUserHistory) {
                    this.getHistory();
                }
                this.isShowHistory = true;
                this.isShowUserHistory = false;
            },
            clickUserHistory: function() {
                if (this.isShowHistory) {
                    this.getUserHistory();
                }
                this.isShowHistory = false;
                this.isShowUserHistory = true;
            },
            varUserHistory: function(data) {
                var self = this;
                this.isShowValidatePop = true;
                this.curVarUserHistory = data;
                this.getBlockId((this.curVarUserHistory.roundid * this.turninBlock * 100 + this.curVarUserHistory.turnid * this.turninBlock + this.turnallowturnBlock + 1 - this.baseTurnid * this.turninBlock), function(data) {
                    self.curVarBlockHash = data.id;
                    self.$refs.copyhash.setAttribute('data-clipboard-text', data.id);
                });
            },
            varHistory: function(data) {
                this.isShowHValidatePop = true;
                this.curVarHistory = data;
                this.$refs.hcopyhash.setAttribute('data-clipboard-text', this.curVarHistoryBlockHash);
            },
            changeSound: function() {
                this.isOpenSound = !this.isOpenSound;
                if (this.isOpenSound) {
                    Common.setCookie('isOpenSound', true);
                    this.$refs.music.play();
                } else {
                    Common.setCookie('isOpenSound', false);
                    this.$refs.music.pause();
                }
            },
            filterRankIndex: function(index) {
                if (index < 3) {
                    return '<i class="i-quiz-rank i-quiz-rank-' + (index + 1) + '"></i>';
                }
                return (index + 1)
            },
            showRankPop: function() {
                this.isShowRankPop = true;
                this.getAwardStatus();
            },
            showNoticePop: function() {
                this.isShowNoticePop = true;
                this.setReadNotice();
                this.getNotice();
            },
            showBetRankPop: function() {
                this.isShowBetRankPop = true;
                this.getBetRank();
            },
            showAwardRankPop: function() {
                this.isShowAwardRankPop = true;
                this.getAwardRank();
            },
            switchIconlist: function() {
                this.isShowCiconlist = !this.isShowCiconlist;
            },
            initRequestAni: function() {
                if (!window.requestAnimationFrame) {
                    var lastTime = 0;
                    window.requestAnimationFrame = function(callback) {
                        var currTime = new Date().getTime();
                        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                        var id = window.setTimeout(function() {
                            callback(currTime + timeToCall);
                        }, timeToCall);
                        lastTime = currTime + timeToCall;
                        return id;
                    }
                }
                if (!window.cancelAnimationFrame) {
                    window.cancelAnimationFrame = function(id) {
                        clearTimeout(id);
                    };
                }
            },
            showActPop: function() {
                this.isShowActPop = true;
                this.getWeekWorking();
                this.getWeekList(this.pagecurrent);
            },
            crc16: function(val) {
                var crc_table = [
                    0x0, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
                    0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
                    0x1231, 0x210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
                    0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de,
                    0x2462, 0x3443, 0x420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485,
                    0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
                    0x3653, 0x2672, 0x1611, 0x630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
                    0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc,
                    0x48c4, 0x58e5, 0x6886, 0x78a7, 0x840, 0x1861, 0x2802, 0x3823,
                    0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b,
                    0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0xa50, 0x3a33, 0x2a12,
                    0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
                    0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0xc60, 0x1c41,
                    0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
                    0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0xe70,
                    0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78,
                    0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f,
                    0x1080, 0xa1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
                    0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e,
                    0x2b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256,
                    0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
                    0x34e2, 0x24c3, 0x14a0, 0x481, 0x7466, 0x6447, 0x5424, 0x4405,
                    0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c,
                    0x26d3, 0x36f2, 0x691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
                    0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab,
                    0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x8e1, 0x3882, 0x28a3,
                    0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
                    0x4a75, 0x5a54, 0x6a37, 0x7a16, 0xaf1, 0x1ad0, 0x2ab3, 0x3a92,
                    0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9,
                    0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0xcc1,
                    0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8,
                    0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0xed1, 0x1ef0
                ];
                var crc = 0x0000;
                for (var i = 0; i < val.length; i++) {
                    crc = crc_table[((crc >> 8) ^ val[i].charCodeAt())] ^ ((crc << 8) & 0x00FFFF);
                }
                return crc;
            },
            getResult(blockId) {
                var result = this.lucknum2Ore(this.crc16(blockId));
                this.setResult(result);
                this.waitCut = false;
                // this.$http.post(oInterface.getResultByHash, {
                //     hash: blockId
                // }, { emulateJSON: true })
                //     .then(function (ret) {
                //         var data = ret.body.data;
                //         switch (ret.body.r) {
                //             case 0:
                //                 console.log(data.result, 2)
                //                 break;
                //             default:
                //         }
                //     },
                //         function (err) {
                //         }
                //     );
            },
            setResult(result) {
                var self = this;
                this.resultDist[this.turnId] = result;
                this.result = result;
                this.gem();
                this.getPrizeByTurnid(self.turnId, result);
            },
            getMy() {
                return (this.myturn[this.result] * 100 * this.timesConfig[this.result] / 100) || 0;
            },
            unconnectedTip() {
                var tip, url, index;
                switch (originRef) {
                    case originConfig[0].ref:
                        tip = lang_openeoswallets + originConfig[0].name;
                        url = originConfig[0].url;
                        break;
                    case originConfig[1].ref:
                        tip = lang_openeoswallets + originConfig[1].name;
                        url = originConfig[1].url;
                        break;
                    case originConfig[2].ref:
                        tip = lang_openeoswallets + originConfig[2].name;
                        url = originConfig[2].url;
                        break;
                    default:
                        index = Math.floor(Math.random() * originConfig.length);
                        tip = lang_openeoswallets + originConfig[index].name;
                        url = originConfig[index].url;
                }
                var flag = confirm(tip);
                if (flag) {
                    window.open(url);
                }
            },
            logingScatter() {
                var self = this;
                ScatterJS.scatter.connect('app').then(async connected => {
                    if (!connected) {
                        self.unconnectedTip();
                        return false;
                    }
                    let account;
                    scatter = ScatterJS.scatter;

                    eos = scatter.eos(
                        self.nodeList[self.curNodePoolIndex],
                        Eos,
                        EOS_CONFIG.eosOptions,
                        self.nodeList[self.curNodePoolIndex].protocol
                    );
                    // window.ScatterJS = null;

                    try {
                        await scatter.suggestNetwork(network);
                    } catch (err) {
                        console.error(err)
                        return;
                    }

                    try {
                        await scatter.getIdentity({
                            accounts: [network]
                        });
                    } catch (err) {
                        console.error(err)
                        return;
                    }

                    account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    console.log(account, scatter.identity.accounts);
                    if (account && account.publicKey && self.isEosaccout(account.publicKey)) {
                        self.identity = account;
                        document.cookie = "account=" + account.name;
                        self.isLogin = true;
                        self.shareCode = account.name;
                        self.getAccountPool();
                        self.getPep();
                        self.getMyBet(0, function() {
                            self.gem();
                        });
                        self.getTurnByTurnid();
                        self.getAccountResInfo();
                    } else {
                        self.popTip('请使用eos账户登录');
                        self.logout();
                    }
                });
            },
            isEosaccout(account) {
                if (account.substr(0, 3) === 'EOS') {
                    return true;
                } else {
                    return false;
                }
            },
            ShowOwnList() {
                if (!this.isLogin) {
                    this.logingScatter();
                    return;
                }
                // this.isShowOwnList = !this.isShowOwnList;
            },
            getTurnByTurnid() {
                var self = this;
                clearTimeout(oTimeout.getTurnByTurnid);
                if (document.visibilityState == 'hidden') {
                    return;
                }
                this.get_record_by_turnid(self.turnId).then(this.getTurn);
                oTimeout.getTurnByTurnid = setTimeout(self.getTurnByTurnid, 2000);
            },
            get_record_by_turnid(turnid) {
                return eos_rpc.get_table_rows({
                    table: 'betshadow',
                    code: EOS_CONFIG.eosTo,
                    scope: EOS_CONFIG.eosTo,
                    key_type: 'i64',
                    lower_bound: turnid,
                    upper_bound: turnid,
                    index_position: 3
                });
            },
            resetTurn() {
                this.renderTurn({
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                });
            },
            getTurn(res) {
                var data = res.rows;
                var _turn = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                };
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        for (var x in data[i].bet.amount) {
                            _turn[parseInt(x) + 1] += data[i].bet.amount[x];
                        }
                    }
                    for (var index in _turn) {
                        _turn[index] = _turn[index] / PRECISON;
                    }
                }
                this.renderTurn(_turn);
            },
            getPrizeByTurnid(turnid, result) {
                var self = this;
                this.get_record_by_turnid(turnid).then(function(res) {
                    self.getAwardMax(res, result, turnid);
                });
            },
            getAwardMax(res, result, turnid) {
                var data = res.rows;
                var _topData = {
                    'minerid': [],
                    'god': 0
                };
                var award = {};
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (!award[data[i].player_name]) award[data[i].player_name] = 0;
                        award[data[i].player_name] += data[i].bet.amount[result - 1];

                        if (this.openBlocktime[turnid] && parseInt(data[i].timestamp) > this.openBlocktime[turnid]) {
                            continue;
                        }
                        if (award[data[i].player_name] < _topData.god) {
                            continue;
                        }
                        if (award[data[i].player_name] > _topData.god) {
                            _topData.minerid = [];
                            _topData.god = award[data[i].player_name];
                        }
                        if (_topData.minerid.indexOf(data[i].player_name) === -1) _topData.minerid.push(data[i].player_name);
                    }
                }
                _topData.god = _topData.god * this.timesConfig[result];
                this.renderAwardMax(_topData);
            },
            renderAwardMax(_topData) {
                var userid = _topData.minerid || "";
                var _godNum = _topData.god || 0;
                var _useridList;
                if (userid.length > 1) {
                    _useridList = userid[0] + lang_inTotal + userid.length + lang_people;
                } else {
                    _useridList = userid[0] || "";
                }
                /*根据开奖结果添加水晶样式*/
                if (genFloat(_godNum) > 0.1) {
                    this.textNotice = lang_congratulations + '：<em>' + _useridList + '</em>' + lang_recHighAward + '<em>' + genFloat(_godNum / PRECISON) + '' + '</em>EOS';
                } else {
                    this.textNotice = lang_lsgamenotguess;
                }
                this.isAnitop();
            },
            chooseCrypto(index) {
                location.href = this.cryptoList[index].url;
            },
            getAccountPool: function() {
                var self = this;
                eos_rpc.get_table_rows({
                    table: 'prizepool',
                    code: CONTRACT_NAME,
                    scope: CONTRACT_NAME,
                    limit: -1,
                }).then(this.setPool);
            },
            setPool(res) {
                var data = res.rows;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].asset_id === 1) {
                            let t = data[i].asset_sym.split(",");
                            let PRECISION = parseInt(t[0]);
                            this.pool = data[i].prize_pool / Math.pow(10, PRECISION);
                            return;
                        }
                    }
                }
            },
            logout: function() {
                var self = this;
                scatter.forgetIdentity().then(res => {
                    self.isLogin = false;
                    self.resetAccountInfo();
                });
            },
            resetAccountInfo: function() {
                this.crypto = 0;
            },
            getAccountResInfo() {
                var self = this;
                eos_rpc.get_account(this.identity.name).then(res => {
                    self.schRam = parseInt(res.ram_usage / res.ram_quota * 100) + '%';
                    self.schCpu = parseInt(res.cpu_limit.available / res.cpu_limit.max * 100) + '%';
                    // console.log(res.ram_usage)//使用量
                    // console.log(res.ram_quota)//总量
                    // console.log(res.cpu_limit.max)//cpu最大值
                    // console.log(res.cpu_limit.available)//cpu剩余值
                    // console.log(res.cpu_limit.used)//cpu已使用
                });
            },
            lucknum2Ore(num) {
                if (num < 0) {
                    return num;
                }
                if (num < 32441) {
                    return 1;
                }
                if (num < 54002) {
                    return 2;
                }
                if (num < 64455) {
                    return 3;
                }
                return 4;
            },
            loadVconsole() {
                var _script = document.createElement("script");
                _script.type = "text/javascript";
                _script.src = "/js/lib/vconsole.min.js";
                document.getElementsByTagName('head')[0].appendChild(_script);
                _script.onload = function() {
                    var vConsole = new VConsole();
                }
            },
            getPlatformList() {
                var self = this;
                self.$http.post(oInterface.platformList, {

                    }, {
                        emulateJSON: true
                    })
                    .then(function(ret) {
                            var data = ret.body.data;
                            switch (ret.body.r) {
                                case 0:
                                    self.whileList = ret.body.data;
                                    break;
                                default:
                            }
                        },
                        function(err) {});
            },
            toBonusPage() {
                if (this.whileList.indexOf(this.identity.name) !== -1) {
                    location.href = '/luckyeosminer/bonus/indexpro';
                } else {
                    location.href = '/luckyeosminer/bonus/index';
                }
            },
            isAnitop() {
                var self = this;
                var topMsg = document.getElementById('topMsg');
                setTimeout(function() {
                    console.log(topMsg.offsetWidth);
                    if (topMsg.offsetWidth > 670) {
                        Velocity(topMsg, "stop", true);
                        self.topAni(true);
                    }
                }, 500);
            },
            topAni(isRe) {
                var self = this;
                var topMsg = document.getElementById('topMsg');
                topMsg.style.left = '670px';
                Velocity(topMsg, {
                    left: -topMsg.offsetWidth
                }, {
                    duration: 6000,
                    easing: "linear",
                    complete: function(elements) {
                        if (isRe) {
                            self.topAni();
                        } else {
                            topMsg.style.left = '0px';
                        }
                    }
                });
            },
            menuAni() {
                var self = this;
                var menu = document.getElementById('header-own-list');
                var iconmenu = document.getElementById('icon-menu');
                var left = 0;
                self.isShowOwnList = !self.isShowOwnList;
                if (self.isShowOwnList) {
                    left = 210;
                } else {
                    left = 0;
                }
                Velocity(menu, {
                    left: left - 210
                }, {
                    duration: 300,
                    easing: "linear",
                });
                Velocity(iconmenu, {
                    left: left
                }, {
                    duration: 300,
                    easing: "linear",
                });
            },
            chooseNode(nodeIndex) {
                var self = this;
                this.curNodePoolIndex = nodeIndex;
                _network = ScatterJS.Network.fromJson(NodePool[this.curNodePoolIndex]);
                eos_rpc = new JsonRpc(_network.fullhost());
                eos = scatter.eos(
                    self.nodeList[self.curNodePoolIndex],
                    Eos,
                    EOS_CONFIG.eosOptions,
                    self.nodeList[self.curNodePoolIndex].protocol
                );
            },
            getNodeListDelay() {
                this.getNodeDelay(0);
            },
            getNodeDelay(nodeIndex) {
                var self = this;
                var reqStime = (new Date()).getTime();
                self.$http.get(self.nodeList[nodeIndex].protocol + '://' + self.nodeList[nodeIndex].host + EOS_CONFIG.getInfo, {}, {
                        emulateJSON: true,
                        timeout: 500
                    })
                    .then(function(res) {
                        var reqEtime = (new Date()).getTime();
                        console.log(self.nodeList[nodeIndex], nodeIndex)
                        self.nodeList[nodeIndex].delay = reqEtime - reqStime;
                        if (nodeIndex + 1 !== self.nodeList.length) self.getNodeDelay(++nodeIndex);
                    }, function(err) {
                        self.nodeList[nodeIndex].delay = 0;
                        if (nodeIndex + 1 !== self.nodeList.length) self.getNodeDelay(++nodeIndex);
                    });
            },
            showNodeList() {
                this.isShowNodeList = !this.isShowNodeList;
                if (this.isShowNodeList) {
                    this.getNodeListDelay();
                }
            }
        }
    });

    (function initHtml() {
        var zoomH = window.innerHeight * 0.8 / 1334,
            zoomW = window.innerWidth / 750;

        // /*缩放*/
        // $('div.quiz,div.g-popwp').css({
        //     "-webkit-transform-origin": "top left",
        //     "-webkit-transform": "scale(" + zoomW + ")",
        //     "height": 1334,
        //     "width": 750,
        // });

        for (var j = 0, quiz = document.getElementsByClassName('quiz'), quizLen = quiz.length; j < quizLen; j++) {
            quiz[j].style.transformOrigin = "top left";
            quiz[j].style.transform = "scale(" + zoomW + ")";
            quiz[j].style.height = '1334px';
            quiz[j].style.width = '750px';
        }

        for (var j = 0, quiz = document.getElementsByClassName('header-own-list'), quizLen = quiz.length; j < quizLen; j++) {
            quiz[j].style.transformOrigin = "top left";
            quiz[j].style.transform = "scale(" + zoomW + ")";
            quiz[j].style.height = '1334px';
        }

        for (var k = 0, popwp = document.getElementsByClassName('g-popwp'), popwpLen = popwp.length; k < popwpLen; k++) {
            popwp[k].style.transformOrigin = "top left";
            popwp[k].style.transform = "scale(" + zoomW + ")";
            popwp[k].style.height = '1334px';
            popwp[k].style.width = '750px';
        }

        for (var i = 0, a = document.getElementsByTagName('a'), aLen = a.length; i < aLen; i++) {
            a[i].addEventListener('touchstart', function() {}, false);
        }

        document.addEventListener('visibilitychange', function() { //浏览器切换事件
            if (document.visibilityState != 'hidden') { //状态判断
                mainCon.getNewBlockId();
                mainCon.getTurnByTurnid();
                mainCon.getPep();
            }
        });

        window.onload = function() {
            setTimeout(function() {
                mainCon.logingScatter();
                mainCon.initAnimate();
            }, 1000);
        }
    })();

    function genFloat(number) {
        return Math.floor(parseFloat(number) * 10000) / 10000;
    }

    function animation(ele, imgArr) {
        var index = 0;
        var imgsLen = imgArr.length;
        var fps = 30;
        var now;
        var then = Date.now();
        var interval = 1000 / fps;
        var delta;
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        (function run() {
            window.requestAnimationFrame(run);

            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(imgArr[index], 0, 0);
                index++;
                if (index >= imgsLen) {
                    index = 0;
                }
            }
        })();
    }



    function loadImage(arr, callback) {
        var len = arr.length,
            completenum = 0,
            arrimg = [];

        function imgloadComplete() {
            completenum++;
            if (completenum >= len) {
                callback(arrimg);
            }
        }

        for (var i = 0; i < len; i++) {
            arrimg[i] = new Image();
            arrimg[i].src = arr[i];
            arrimg[i].onload = imgloadComplete;
        }
    }

})(window);