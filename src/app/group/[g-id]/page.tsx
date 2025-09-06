import { Metadata } from "next"

type Props = {
  params: { "g-id": string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params["g-id"]

  return {
    title: `group ${id}`,
    description: `group ${id}`,
  }
}

async function Group({ params }: Props) {
  const id = params["g-id"]
  return <div>group {id}</div>
}

export default Group
