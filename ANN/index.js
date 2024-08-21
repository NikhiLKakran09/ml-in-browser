// Load or prapare data
var x = tf.tensor2d([[0,0],[0.5,0.5],[1,1]]);
var y = tf.tensor2d([[1],[0.5],[0]]);

// Neural network structure
const configInput = {
    inputShape:[2],
    units:8,
    activation:"sigmoid"
}
const configOutput = {
    units:1,
    activation: 'relu'
}

const model = tf.sequential();
const input = tf.layers.dense(configInput);
const output = tf.layers.dense(configOutput);
model.add(input);
model.add(output);

// Configuration
const sgdopt = tf.train.sgd(0.1);
const config = {
    optimizer: sgdopt,
    loss:"meanSquaredError"
}

// Compile and Training
model.compile(config);

async function train(){
    for(let i = 0; i < 250; i++ ){    
        const response = await model.fit(x, y);
        console.log(response.history.loss[0]);
    }
}

// Prediction
train().then(() => {
    let outputs = model.predict(x);
    var result = document.getElementById("results");
    result.innerText = outputs;
    console.log("Training Complete.");
})




