import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
})

const openai = new OpenAIApi(configuration);

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.post('/dream', async (req, res) => {
  const prompt = req.body.prompt;
  
  console.log(`creating art with your prompt ${prompt}`)

  try {
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });
    console.log(aiResponse)
    const image = aiResponse.data.data[0].url;
    res.send({ image })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(500).send({ error })
  }


});

app.listen(8080, console.log('make art on localhost:8080/dream'))
