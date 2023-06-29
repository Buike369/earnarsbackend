const express = require('express')
const router = express.Router()
const { getPosts, getResultForex, getTipCryptoM, getTipCryptoD, getPostMid, getTipCrypto, getTipFprex, getResultBinary, getResultCrypto, getPost, addBinary, addPost,addCrypto,deletePost,updatePost,addPost1,getPost2,addPost2,getPost3,addPost3,addCopon,getCopon,postResultForexPost,postResultCryptoPost,getNum,getById,getCount} = require("../controllers/post.js")

router.get("/",getPosts);
router.get("/register",getPost);
router.get("/coupon",getCopon);
router.get("/sports/tip/daily",getPost2);
router.get("/sports/tip/mid", getPostMid);

router.get("/forex/tip", getTipFprex);
router.get("/crypto/tip",getTipCrypto);
router.get("/crypto/tip/d", getTipCryptoD);
router.get("/crypto/tip/m", getTipCryptoM);

router.get("/count",getCount);
router.get("/sports/tip3",getPost3);
router.get("/forex/tip3", getResultForex);
router.get("/crypto/tip3", getResultCrypto);
router.get("/binary/tip3", getResultBinary);
router.get("/sports/num",getNum);
router.post("/sports",addPost);
router.post("/forex",addPost1);
router.post("/coupon",addCopon);
router.post("/crypto", addCrypto);
router.post("/binary", addBinary);
router.post("/postResult",addPost2);
router.post("/postResultForex",postResultForexPost);
router.post("/postResultCrypto",postResultCryptoPost);
// router.post("/postResultBinary",postResultBinaryPost);
router.post("/resultforex",addPost3);
router.delete("/:id",deletePost);
router.put("/:id",updatePost);
router.get("/:id",getById);




module.exports = router;