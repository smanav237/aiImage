import FileSaver from 'file-saver'

import {surpriseMePrompts} from '../constant'

export function getRandomPrompt(prompt) 
{
    const randIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randPrompt = surpriseMePrompts[randIndex]  // displaying randing index's value

    // so that same text is not displayed again
    if(randPrompt === prompt) 
        return getRandomPrompt(prompt)

    return randPrompt;
}

export async function downloadImage(_id,photo)
{
    FileSaver.saveAs(photo,`download-${_id}.jpg`)
}