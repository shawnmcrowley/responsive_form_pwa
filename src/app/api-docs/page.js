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
     import swaggerSpec from '../../../swaggerConfig';

     const Docs = () => {
        return (
        <section className="container">
          <ReactSwagger spec={swaggerSpec} />
        </section>
      )
              
     };
     
     export default Docs;
