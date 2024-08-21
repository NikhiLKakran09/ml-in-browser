// prepare data
const x = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]],[4,2]);
const y = tf.oneHot(tf.tensor1d([0,0,0,1]).toInt(),2);

// Network structure
const configInput = {
    inputShape:[2],
    units:4,
    activation:"sigmoid"
}
const configOutput = {
    units:2,
    activation:"softmax"
}

const model = tf.sequential();
const input = tf.layers.dense(configInput);
const output = tf.layers.dense(configOutput);

model.add(input);
model.add(output);

// Configuration
const admopt = tf.train.adam(0.1);
const config = {
    optimizer:admopt,
    loss:"categoricalCrossentropy"
}

// Compile and Train
model.compile(config);

async function train(){
    for(let i = 0;i<250;i++){
        const result = await model.fit(x,y);
        console.log(result.history.loss[0]);
    }
}

// Prediction
train().then(() => {
    let outputs = model.predict(x);
    var result = document.getElementById("results");
    result.innerHTML = outputs;
    outputs.print();
    console.log("Training Complete.")
})
