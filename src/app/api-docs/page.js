/* import { getApiDocs } from "../utils/swagger"
import ReactSwagger from "./next-swagger"

export default async function IndexPage() {
  const spec = await getApiDocs()
  //const spec = 'openapi.json'
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
    <SwaggerUI spec={swaggerSpec} />;
  )
}
  */
     
     import React from 'react';
     import ReactSwagger from '../components/next-swagger';
     import swaggerSpec from '../configs/swaggerConfig';

     const Docs = () => {
        return (
        <section className="grid-containerbg-white pt-8 rounded-2xl" style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "2rem",
          paddingLeft: "2rem",
          paddingRight: "2rem"

      }}>
          <ReactSwagger spec={swaggerSpec} />
        </section>
      )
              
     };
     
     export default Docs;
