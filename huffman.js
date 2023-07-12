class Heap{

    constructor(comparator){
        this.data = []
        this.comparator = comparator

    }

    peek() {
        if (this.data[0] == null){
            return null
        }
        return this.data[0];
    }

    push(value){
        let huffmanTree = this
        function heapifyUp(index){
            if( index <= 0 ){
                return;
            }
            
            let parent = Math.floor((index-1) / 2)
            if (huffmanTree.comparator(huffmanTree.data[index].freq,huffmanTree.data[parent].freq) < 0 ){
                let value = huffmanTree.data[index]
                huffmanTree.data[index] = huffmanTree.data[parent]
                huffmanTree.data[parent] = value
                heapifyUp(parent)

            }

        }

        this.data.push(value);
        heapifyUp(this.data.length-1)
    }

    pop(){
        if( this.data.length === 0 ){
            return null;
        }
        
        let huffmanTree = this;
        function heapifyDown(index){
            if( index >= huffmanTree.data.length ){
                return;
            }
            

            let rightChild = index * 2 + 1 
            let leftChild = index * 2 + 2 
            let least = index;

            if (leftChild < huffmanTree.data.length){
                if ((huffmanTree.comparator(huffmanTree.data[least], huffmanTree.data[leftChild])) > 0){
                    least = leftChild
                }
            }
            if (rightChild < huffmanTree.data.length){
                if ((huffmanTree.comparator(huffmanTree.data[least], huffmanTree.data[rightChild])) > 0){
                    least = rightChild
                }
            }

            if (index !== least){
                let other = huffmanTree.data[index]
                huffmanTree.data[index] = huffmanTree.data[least]
                huffmanTree.data[least] = other
                heapifyDown(least)
            }
        }

        let returnValue = this.data[0];
        this.data[0] = this.data[this.data.length-1]
        this.data.pop()
        heapifyDown(0)

        return returnValue
    }
}
class Huffman {

    /**
     * Compresses a text string into a byte array
     * @param {string} text text to compress
     * @returns the compress binary data
     */
    static HuffNode = class {
        constructor(letter, freq){
            this.letter = letter;
            this.freq = freq;
            this.left = null;
            this.right = null;
        }
    }

    static LETTER_ENCODING_BITS = 8
    static END_MESSAGE_CHAR = String.fromCharCode(3); // ASCII 3 is END_OF_TEXT

    compress(text){
        function createFrqTable(text) {
            const map = new Map();
        
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (map.has(char)) {
                    map.set(char, map.get(char) + 1);
                } else {
                    map.set(char, 1);
                }
            }
            console.log(map)
            return createHuffmanTree(map);
        }
        
        function createHuffmanTree(freqs){
            let heap = new Heap(function comparator(a,b){
                return a.freq - b.freq
            })

            for( let [letter,freq] of freqs.entries() ){
                console.log("pushing shit in rn")
                heap.push( new Huffman.HuffNode(letter, freq));
                console.log("after the shits in")
            }


            let tree = null;
            while (heap.peek() !== null){
                console.log(heap)
                let leftNode = heap.pop()
                console.log(leftNode)
                let rightNode = heap.pop()

                if (rightNode !== null){
                    console.log("printing a time")
                    console.log(leftNode.freq)
                    let parent = new Huffman.HuffNode('*' , leftNode.freq+rightNode.freq)
                    console.log("oprinting after ")
                    parent.left = leftNode
                    parent.right = rightNode

                    heap.push(parent)
                }
                else {
                    tree = leftNode;
                }
                
                
            }
            console.log("printing tree")
            console.log(tree)
            return createHuffmanTable(tree)
            
        }
        function createHuffmanTable(huffRoot){
            let HuffmanTable = new Map()
            function TravealsalGOgo(node,string){
                if (node == null){
                    return null
                }
                if ((node.left == null) && (node.right == null)){
                    HuffmanTable.set(node.letter,string)
                }
                TravealsalGOgo(node.left, (string + "0"))
                TravealsalGOgo(node.right, (string + "1"))
            }
            TravealsalGOgo(huffRoot, "")
            return HuffmanTable
        }  
        function encodeTree(huffRoot){

        }
        function encodeData(text, huffTable){

        }

        return (createFrqTable(text));
    }

    /**
     * Decompresses a byte array into a string
     * @param {byte[]} binaryData data to decompress
     * @returns the decompressed text data
     */
    decompress(binaryData){
        function decodeTree(binaryData){

        }
        function decodeData(huffTree, beginOffset, binaryData){
            
        }

        return ''
    }
}

let huff = new Huffman()
console.log(huff.compress("Shipping ships ship ships"))



