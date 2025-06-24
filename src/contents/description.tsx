import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Description() {
  const links: InspirationLink[] = [
    { year: 2024, teamName: "Heidelberg", pageName: "description" },
    { year: 2024, teamName: "Marburg", pageName: "description" },
    { year: 2024, teamName: "EPFL", pageName: "description" },
    { year: 2024, teamName: "JU-Krakow", pageName: "description" },
    { year: 2024, teamName: "UToronto", pageName: "description" },
    { year: 2023, teamName: "Estonia-TUIT", pageName: "description" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Bronze Medal Criterion #1: Wiki</h4>
            <p>Describe how and why you chose your iGEM project.</p>
            <hr />
            <p>
              Visit the{" "}
              <a href="https://competition.igem.org/judging/medals">
                Medals page
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h3>The Problem: Sleep Disturbances in Space</h3>
          <p>
            In current space exploration and missions, astronauts face significant physiological challenges, with one of the most prominent issues being sleep disturbances. Life on Earth has evolved with a biological clock synchronized to a 24-hour day-night cycle, which plays a crucial role in regulating various physiological functions, including the sleep-wake cycle. However, in the space environment, astronauts' biological clocks are severely disrupted. In low Earth orbit, spacecraft complete one orbit around the Earth every 90 minutes, meaning astronauts experience 16 sunrises and sunsets in a single day. This abnormal light cycle disrupts their circadian rhythms, leading to sleep disturbances. These sleep issues not only affect astronauts' daily work efficiency but also may have long-term negative impacts on their physical and mental health. Current solutions, such as the use of oral melatonin supplements, although helpful in alleviating sleep disturbances to some extent, cannot precisely regulate the release timing and dosage, and they also face issues like individual variation and metabolic uncertainties.
          </p>

          <h3>Our Solution: Engineered Probiotics for On-Demand Melatonin</h3>
          <p>
            To address this issue, this project proposes an innovative solution—utilizing synthetic biology to engineer a safe probiotic, Escherichia coli Nissle 1917 (EcN), to colonize astronauts' intestines and synthesize and release melatonin in response to external signals (such as red light). Our goal is to develop a "sleep-inducing bacterium," which would provide astronauts with personalized and precise sleep regulation support through biotechnology. This solution differs from traditional drug-based approaches by utilizing an engineered bacterium to continuously synthesize and release melatonin on demand, providing more stable and efficient melatonin supply. Compared to traditional oral medications, this probiotic-based biological drug delivery system has several advantages, especially in the unique environment of space exploration, where it effectively reduces the burden of drug storage and transportation, and avoids significant fluctuations in drug levels within the body.
          </p>

          <h4>Core Innovation: Red-Light Controlled Synthesis</h4>
          <p>
            Specifically, the core innovation of this project involves using E. coli Nissle 1917 (EcN), a probiotic commonly used in clinical applications, as the foundation. We genetically modify it to enable stable colonization in astronauts' intestines and melatonin synthesis. We have designed a controllable genetic switch system that uses external red light signals to trigger melatonin synthesis. The core of this system is the serine site-specific recombinase Bxb1, which can perform directionality flips in the genes and regulate the expression of melatonin synthesis genes. The system places key genes at specific DNA sites and integrates them with a red-light-responsive switch, thus enabling precise control over melatonin synthesis. The red-light response system activates melatonin production through external red light stimulation, thus avoiding fluctuations in drug doses and side effects while enhancing treatment personalization and specificity.
          </p>

          <h4>Biosafety Measures</h4>
          <p>
            In terms of biosafety, we employed tryptophan auxotrophic engineered strains to ensure that these bacteria can only survive in astronauts' intestines, thus preventing their spread in space or on Earth. Additionally, we further optimized the MazF/MazE toxin-antitoxin suicide system to ensure that the engineered bacteria would quickly die if exposed to inappropriate environments, reducing biosafety risks.
          </p>

          <h4>Modeling and Optimization (Dry Lab)</h4>
          <p>
            To achieve this goal, we conducted extensive dry-lab experiments and optimizations. Firstly, in enzyme engineering, we analyzed and optimized the key enzymes in the melatonin biosynthesis pathway. Through molecular dynamics simulations and molecular docking techniques, we predicted the interactions between these enzymes and their substrates, and based on these analyses, we rationally designed the enzymes to improve their catalytic activity and stability. These optimizations will help enhance the overall efficiency of melatonin synthesis and lay the foundation for wet-lab experiments involving strain construction and biosynthesis. Secondly, we developed a pharmacokinetic (PK) model based on the available data on melatonin in microgravity conditions using rats. This model predicts how the engineered bacteria will synthesize, absorb, distribute, metabolize, and excrete melatonin in astronauts' bodies. Through these simulations, we can precisely control the synthesis rate, dosage, and release pattern of melatonin to maintain stable melatonin levels in astronauts' bodies, maximizing therapeutic effects while minimizing side effects. Additionally, we have optimized and validated various models to ensure the stability and efficiency of the gene regulation system. By using large language models (LLMs) to assist with literature research, we efficiently integrated current research findings and applied them to experimental design. For instance, in designing primers, optimizing gene expression vectors, and developing transformation and cultivation protocols, LLMs provided valuable experimental suggestions, helping to reduce uncertainties and accelerate the progress of our experiments.
          </p>

          <h4>Future Impact</h4>
          <p>
            Through these innovative designs, our system effectively addresses the sleep disturbances faced by astronauts in space. The successful implementation of this system not only provides a safe, stable, and efficient biological solution for deep-space exploration and long-term space missions, but also offers significant support for future human space colonization. As space exploration continues to advance, long-duration deep-space missions and future interstellar migration will present unprecedented challenges to astronauts' physiological and psychological health. Through this system, astronauts will benefit from biological rhythm regulation similar to that on Earth, greatly improving their work efficiency and quality of life, and providing new technological support for future space colonization and deep-space exploration missions.
          </p>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>

      <div className="row mt-4">
        <div className="col">
          <h2>References</h2>
          <hr />
          <p>
            Cite all relevant research papers, scientific articles, and other
            sources that informed your project.
          </p>
          <p>
            Create a dedicated "References" section at the end of the page, and
            use a consistent citation style.
          </p>
          {/* Example: <p>[1] Author, A. et al. (Year). Title of the paper. Journal, Volume(Issue), pages.</p> */}
        </div>
      </div>
    </>
  );
}