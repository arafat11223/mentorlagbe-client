import TuitionForm from "../../../../../../components/tuitions/TuitionForm";

export const instant = false;

interface EditTuitionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTuitionPage({
  params,
}: EditTuitionPageProps) {
  const { id } = await params;

  return <TuitionForm tuitionId={id} />;
}