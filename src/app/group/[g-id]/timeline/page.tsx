type Props = {
  params: Promise<{ "g-id": string }>;
};


async function Timeline({  params }: Props) {
  const resolvedParams = await params;
  const groupId = resolvedParams['g-id'];

  return (
    <div>
      group id is {groupId}
    </div>
  )
}

export default Timeline