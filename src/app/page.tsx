import { titlefont } from "@/config/fonts";

export default function Home() {
  return (
    <main className="">
      <h1>Hola mundo</h1>
      <h1 className={ `${titlefont.className} font-bold`}>Hola mundo</h1>
    </main>
  );
}
