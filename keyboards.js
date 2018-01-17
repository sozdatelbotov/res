const kb = require('./keyboards-buttons')

module.exports= {
    home: [[kb.home.about, kb.home.techologies], [kb.home.portfolio, kb.home.price], [kb.home.order]],
    preorder: [[kb.preorder.contacts, kb.preorder.order], [kb.back]],
    back: [[kb.back]],
    //order: [[kb.order.desc],[kb.back]],
    ok: [[kb.order.ok]]
}