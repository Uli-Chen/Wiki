import { ExpandableBar } from "../components/ExpandableBar";
import { PDFViewer } from "../components/PdfViewer";

export function Description() {
  return (
    <div className="wiki-description">
      <h2>Project Description</h2>
      <hr />
      <p>
        Our project aims to tackle an important challenge in synthetic biology.
        By integrating computational design and experimental approaches, we seek
        to provide a robust solution that can be applied to real-world problems.
      </p>

      <p>
        The motivation behind this project stems from both prior research and
        urgent real-world needs. We carefully evaluated multiple directions
        before selecting this project as the one with the most impact potential.
      </p>

      <h3>Key Objectives</h3>
      <ul>
        <li>Identify and address a pressing problem with broad relevance.</li>
        <li>Develop a clear methodology combining dry lab and wet lab work.</li>
        <li>Ensure scalability and reproducibility of our approach.</li>
      </ul>

      <p>
        For more details, please refer to our{" "}
        <a href="https://competition.igem.org/judging/medals">
          official iGEM Medals page
        </a>
        .
      </p>
      <ExpandableBar title="Bronze Medal Criterion #1: Wiki">
        <p>Describe how and why you chose your iGEM project.</p>
        <p>
          Visit the{" "}
          <a
            href="https://competition.igem.org/judging/medals"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medals page
          </a>{" "}
          for more information.
        </p>
      </ExpandableBar>

      <ExpandableBar title="Tips for Success">
        <ul>
          <li>Be clear and concise.</li>
          <li>Use subheadings for organization.</li>
          <li>Enhance with visuals.</li>
          <li>Document your process thoroughly.</li>
        </ul>
      </ExpandableBar>
      <ExpandableBar title="Example PDF">
        <PDFViewer url="https://arxiv.org/pdf/1706.03762"></PDFViewer>
      </ExpandableBar>
    </div>
  );
}
