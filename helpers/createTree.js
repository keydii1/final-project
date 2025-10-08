
const createTree = (arr, parentId = "")=>{
     const tree = [];
        arr.forEach(item => {
            // Convert _id to string để so sánh
            const itemParentId = item.parent_id ? item.parent_id.toString() : "";
            if(itemParentId === parentId) {
                const newItem = {...item._doc}; // Copy toàn bộ data
                const children = createTree(arr, item._id.toString());
                if(children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }   
        });
        return tree;
}
module.exports.Tree = (arr, parentId = "")=> {
    return createTree(arr, parentId);
}