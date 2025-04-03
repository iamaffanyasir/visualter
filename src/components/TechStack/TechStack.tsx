'use client';

import './TechStack.css';

const techStack = [
  {
    name: 'React',
    icon: '/images/tech/react.svg',
    category: 'Frontend'
  },
  {
    name: 'Next.js',
    icon: '/images/tech/nextjs.svg',
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    icon: '/images/tech/typescript.svg',
    category: 'Language'
  },
  {
    name: 'Node.js',
    icon: '/images/tech/nodejs.svg',
    category: 'Backend'
  },
  {
    name: 'Python',
    icon: '/images/tech/python.svg',
    category: 'Language'
  },
  {
    name: 'MongoDB',
    icon: '/images/tech/mongodb.svg',
    category: 'Database'
  },
  {
    name: 'PostgreSQL',
    icon: '/images/tech/postgresql.svg',
    category: 'Database'
  },
  {
    name: 'AWS',
    icon: '/images/tech/aws.svg',
    category: 'Cloud'
  },
  {
    name: 'Docker',
    icon: '/images/tech/docker.svg',
    category: 'DevOps'
  },
  {
    name: 'Kubernetes',
    icon: '/images/tech/kubernetes.svg',
    category: 'DevOps'
  },
  {
    name: 'TensorFlow',
    icon: '/images/tech/tensorflow.svg',
    category: 'AI/ML'
  },
  {
    name: 'PyTorch',
    icon: '/images/tech/pytorch.png',
    category: 'AI/ML'
  },
  {
    name: 'Figma',
    icon: '/images/tech/figma.svg',
    category: 'UI/UX'
  },
  {
    name: 'MySQL',
    icon: '/images/tech/mysql.svg',
    category: 'Database'
  },
  {
    name: 'C#',
    icon: '/images/tech/csharp.svg',
    category: 'Programming'
  },
  {
    name: 'Flutter',
    icon: '/images/tech/flutter.svg',
    category: 'Programming'
  },
  {
    name: 'Javascript',
    icon: '/images/tech/javascript.svg',
    category: 'Programming'
  },
  {
    name: 'Java',
    icon: '/images/tech/java.svg',
    category: 'Programming'
  },
  {
    name: 'Visual Studio',
    icon: '/images/tech/visual.svg',
    category: 'IDE'
  },
  {
    name: 'VSCode',
    icon: '/images/tech/vs.svg',
    category: 'IDE'
  },
  {
    name: 'GoDaddy',
    icon: '/images/tech/godaddy.svg',
    category: 'Domain'
  },
  {
    name: 'Google Cloud',
    icon: '/images/tech/googlecloud.svg',
    category: 'Cloud'
  },
  {
    name: 'OpenCV',
    icon: '/images/tech/opencv.svg',
    category: 'AI/ML'
  }
];

export const TechStack = () => {
  return (
    <section className="tech-stack">
      <div className="tech-stack__container">
        <h2 className="tech-stack__title">Technologies We Work With</h2>
        <p className="tech-stack__subtitle">Leveraging cutting-edge technologies to build powerful solutions</p>
        
        <div className="tech-stack__slider-container">
          <div className="tech-stack__slider">
            {/* First set of items */}
            {techStack.map((tech, index) => (
              <div key={`tech-1-${index}`} className="tech-stack__item">
                <img src={tech.icon} alt={tech.name} className="tech-stack__icon" />
                <span className="tech-stack__name">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {techStack.map((tech, index) => (
              <div key={`tech-2-${index}`} className="tech-stack__item">
                <img src={tech.icon} alt={tech.name} className="tech-stack__icon" />
                <span className="tech-stack__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
