export type ProjectChapter = {
  label: string;
  title: string;
  detail: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  problem: string;
  approach: string;
  technologies: string[];
  constraints: string[];
  result: string;
  chapters: ProjectChapter[];
};

export const projects: Project[] = [
  {
    slug: "fpga-angular-estimation",
    number: "01",
    title: "FPGA-Based Angular Position & Velocity Estimation",
    category: "Digital hardware / real-time estimation",
    year: "2024",
    shortDescription:
      "A deterministic estimator shaped around timing, precision, and a finite hardware budget.",
    problem:
      "How do you estimate angular position and velocity in real time using limited FPGA resources?",
    approach:
      "Translate the signal path into a purpose-built datapath, then validate behavior against a numerical reference.",
    technologies: ["Verilog", "Spartan-6", "MATLAB", "Fixed-point DSP"],
    constraints: ["Finite logic", "Fixed-point precision", "Cycle-level timing"],
    result: "Hardware-validated, deterministic estimation architecture.",
    chapters: [
      { label: "Problem", title: "Observe motion without losing time.", detail: "Position arrives as an imperfect signal. Velocity must be inferred before latency destabilizes the loop." },
      { label: "Architecture", title: "Make the computation explicit.", detail: "Acquisition, conditioning, estimation, and output become a clocked signal path—not a software abstraction." },
      { label: "Constraint", title: "Resources are part of the equation.", detail: "Word length, multiplier count, and pipeline depth determine what the estimator can become." },
      { label: "Decision", title: "Build the datapath around the physics.", detail: "Parallel stages preserve throughput while fixed-point analysis controls error and silicon cost." },
      { label: "Implementation", title: "Model. Synthesize. Measure. Repeat.", detail: "MATLAB establishes the reference; Verilog carries the behavior into a Spartan-6 implementation." },
      { label: "Result", title: "Determinism, verified in hardware.", detail: "A bounded-latency estimator that resolves position and velocity at the cadence of the control system." },
    ],
  },
];
