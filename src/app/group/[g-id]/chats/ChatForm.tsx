import React, { useActionState } from 'react'
import { sendMessageToGroup } from '../../../../../lib/messageCrud';
import SendButton from './SendButton';


type Props = {
  params: { "g-id": string }
}


function page({ params }: Props) {

   async function sendChat(formData: FormData){
    "use server"
    console.log(params['g-id'], formData.get("message") as string)

    await sendMessageToGroup(params['g-id'], formData.get("message") as string);
   }

  return (
    <>
        <form
            action={sendChat}
            className="flex  gap-3 justify-between w-full  bg-white p-3 shadow-md border-t"
        >
            <input
                type="text"
                name="message"
                placeholder="Type a message"
                required
                className="flex-1 w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <SendButton />
        </form>

    </>
  )
}

export default page