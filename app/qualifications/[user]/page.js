import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UniversityQualifications from "@/lib/web3/universityQualifications";

import { Qualification } from "@/lib/structures";

async function QualificationsPage({params}) {

//0x775e22e991fdA0E0c089c8D860e1E2CD0068D314
  const studentAddress = params?.user || "No User provided";

  const data = await UniversityQualifications.getQualifications(studentAddress);
  const name = await UniversityQualifications.getName(studentAddress);

  return (
    <main className="h-screen p-10 flex flex-col gap-3">
      <h1>Qualifications for {studentAddress}</h1>
      <h2>Name of Student: {name ? name : "No name provided"}</h2>
      {data.length == 0 ? "No data" : data.map((qualification, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{qualification.name}</CardTitle>
          <CardDescription>{qualification.issuedBy}, {qualification.issueDate ? new Date(qualification.issueDate.toString() * 1000).toLocaleDateString("en-US") : "No Issue Date"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{qualification.description}</p>
        </CardContent>
        <CardFooter>
          <p>Qualification Type: {qualification.qualificationType || qualification.qualificationType == 0 ? Qualification[qualification.qualificationType] : "No Type"}</p>
        </CardFooter>
      </Card>
      ))}
    </main>
  );
}

export default QualificationsPage;
