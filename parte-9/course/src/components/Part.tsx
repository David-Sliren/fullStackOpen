interface Props {
  name: string;
  exerciseCount: number;
  description?: string;
  requirements?: string[];
}

export const Part = ({
  name,
  exerciseCount: exersiceCount,
  description,
  requirements,
}: Props) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{requirements}</p>
      <span>{exersiceCount}</span>
    </div>
  );
};
