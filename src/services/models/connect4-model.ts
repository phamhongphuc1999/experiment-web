// import {
//   GraphModel,
//   io,
//   loadGraphModel,
//   ModelPredictConfig,
//   NamedTensorMap,
//   Tensor,
// } from '@tensorflow/tfjs';

// export default class Connect4Model {
//   net: GraphModel<string | io.IOHandler> | undefined = undefined;

//   constructor(path = 'models/connect4_model.onnx') {
//     this.loadConnect4Model(path);
//   }

//   private async loadConnect4Model(path: string) {
//     this.net = await loadGraphModel(path);
//   }

//   public predict(inputs: Tensor | Tensor[] | NamedTensorMap, config?: ModelPredictConfig) {
//     if (this.net) {
//       const [policy, value] = this.net.predict(inputs, config) as Array<Tensor>;
//       return [policy, value];
//     } else throw Error('Invalid model');
//   }
// }

import * as ort from 'onnxruntime-web';

export default class Connect4Model {
  private session: ort.InferenceSession | undefined;

  public async loadConnect4Model(path = '/models/connect4_model.onnx') {
    this.session = await ort.InferenceSession.create(path);
  }

  public async predict(inputs: ort.Tensor) {
    if (!this.session) throw new Error('Model not loaded yet');

    const output = await this.session.run({ input: inputs });

    const policyTensor = output['policy'] || output['output_policy'] || Object.values(output)[0];
    const valueTensor = output['value'] || output['output_value'] || Object.values(output)[1];

    const policy = policyTensor.data as Float32Array;
    const value = valueTensor.data as Float32Array;

    return [Array.from(policy), Array.from(value)];
  }
}
