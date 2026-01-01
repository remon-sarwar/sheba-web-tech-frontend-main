export interface IService {
  id: string;
  title: string;
  description: string;
  offers: IServiceOffer[];
  type: string;
}

export interface IServiceOffer {
  id: number | string;
  position: number;
  imageURL: string;
  title: string;
  description: string;
  serviceId?: number | string;
}

export const services: IService[] = [
  {
    id: '1',
    title: 'Domain Registration and Management',
    description: 'Find your perfect domain and keep it secure.',
    type: 'tailored-solution',
    offers: [
      {
        id: '1',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/841bab6f-a4bc-44e8-829a-f6696f5e3850_domain-name.png',
        title: 'Secure Domains',
        description: 'Register and manage your domain effortlessly.',
        serviceId: '1'
      },
      {
        id: '2',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/841bab6f-a4bc-44e8-829a-f6696f5e3850_domain-name.png',
        title: 'Domain Transfer',
        description: 'Easily transfer your existing domains to our platform.',
        serviceId: '1'
      },
      {
        id: '3',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/841bab6f-a4bc-44e8-829a-f6696f5e3850_domain-name.png',
        title: 'Domain Privacy Protection',
        description: 'Keep your personal info private and secure.',
        serviceId: '1'
      },
      {
        id: '4',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/841bab6f-a4bc-44e8-829a-f6696f5e3850_domain-name.png',
        title: 'DNS Management',
        description: 'Full control over DNS records with simple configuration.',
        serviceId: '1'
      },
      {
        id: '5',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/841bab6f-a4bc-44e8-829a-f6696f5e3850_domain-name.png',
        title: 'Domain Renewals',
        description: 'Automatic renewals to ensure you never lose your domain.',
        serviceId: '1'
      }
    ]
  },
  {
    id: '2',
    title: 'cPanel Hosting',
    description:
      'Fast, reliable, and scalable — powered by premium infrastructure.',
    type: 'direct-buy',
    offers: [
      {
        id: '6',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/6e137d23-c80a-4a92-b4e0-10269cfdcbd7_cloud-server.png',
        title: 'Reliable Hosting',
        description: 'Experience fast and secure hosting with cPanel.',
        serviceId: '2'
      },
      {
        id: '7',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/6e137d23-c80a-4a92-b4e0-10269cfdcbd7_cloud-server.png',
        title: 'Automatic Backups',
        description: 'Daily automatic backups to keep your data safe.',
        serviceId: '2'
      },
      {
        id: '8',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/6e137d23-c80a-4a92-b4e0-10269cfdcbd7_cloud-server.png',
        title: 'Scalable Plans',
        description: 'Easily upgrade as your website grows.',
        serviceId: '2'
      },
      {
        id: '9',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/6e137d23-c80a-4a92-b4e0-10269cfdcbd7_cloud-server.png',
        title: 'Free SSL Certificates',
        description: 'Add HTTPS to your website with auto-renewed SSLs.',
        serviceId: '2'
      },
      {
        id: '10',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/6e137d23-c80a-4a92-b4e0-10269cfdcbd7_cloud-server.png',
        title: 'Email Hosting',
        description: 'Custom domain email accounts for a professional look.',
        serviceId: '2'
      }
    ]
  },
  {
    id: '3',
    title: 'Web Development',
    description:
      'From landing pages to full-stack platforms, we build with performance in mind.',
    type: 'tailored-solution',
    offers: [
      {
        id: '11',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/ae206be0-b403-4444-aa52-8d401c00b534_app-development.png',
        title: 'Responsive Websites',
        description: 'Websites that look great on any device.',
        serviceId: '3'
      },
      {
        id: '12',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/ae206be0-b403-4444-aa52-8d401c00b534_app-development.png',
        title: 'E-commerce Platforms',
        description: 'Build online stores optimized for sales and conversions.',
        serviceId: '3'
      },
      {
        id: '13',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/ae206be0-b403-4444-aa52-8d401c00b534_app-development.png',
        title: 'Custom Web Applications',
        description: 'Tailored web apps to meet your unique business needs.',
        serviceId: '3'
      },
      {
        id: '14',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/ae206be0-b403-4444-aa52-8d401c00b534_app-development.png',
        title: 'CMS Development',
        description: 'Manage content easily with custom CMS solutions.',
        serviceId: '3'
      },
      {
        id: '15',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/ae206be0-b403-4444-aa52-8d401c00b534_app-development.png',
        title: 'Website Performance Optimization',
        description: 'Lightning-fast loading speeds and improved SEO.',
        serviceId: '3'
      }
    ]
  },
  {
    id: '4',
    title: 'App Development',
    description:
      'Native, hybrid, or cross-platform — we bring your app ideas to life.',
    type: 'tailored-solution',
    offers: [
      {
        id: '16',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/1a55f20d-b1eb-4450-ab6a-9836cd33945b_smartphone.png',
        title: 'iOS & Android Apps',
        description: 'Develop apps for all major mobile platforms.',
        serviceId: '4'
      },
      {
        id: '17',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/1a55f20d-b1eb-4450-ab6a-9836cd33945b_smartphone.png',
        title: 'Cross-Platform Apps',
        description: 'Single codebase, multiple platforms.',
        serviceId: '4'
      },
      {
        id: '18',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/1a55f20d-b1eb-4450-ab6a-9836cd33945b_smartphone.png',
        title: 'App Maintenance',
        description: 'Keep your apps updated and bug-free.',
        serviceId: '4'
      },
      {
        id: '19',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/1a55f20d-b1eb-4450-ab6a-9836cd33945b_smartphone.png',
        title: 'App Store Optimization',
        description: 'Improve visibility and downloads on app stores.',
        serviceId: '4'
      },
      {
        id: '20',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/1a55f20d-b1eb-4450-ab6a-9836cd33945b_smartphone.png',
        title: 'Backend Integration',
        description: 'Seamlessly connect apps with APIs and cloud services.',
        serviceId: '4'
      }
    ]
  },
  {
    id: '5',
    title: 'Tech Support and Maintenance',
    description: 'Bugs, updates, troubleshooting — handled by pros, 24/7.',
    type: 'tailored-solution',
    offers: [
      {
        id: '21',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/e156ef1e-3ca0-4993-9aca-7e32a4c565b8_conversation.png',
        title: '24/7 Support',
        description: 'Keep your systems running smoothly with expert support.',
        serviceId: '5'
      },
      {
        id: '22',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/e156ef1e-3ca0-4993-9aca-7e32a4c565b8_conversation.png',
        title: 'Bug Fixes',
        description: 'Quick resolution of software issues.',
        serviceId: '5'
      },
      {
        id: '23',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/e156ef1e-3ca0-4993-9aca-7e32a4c565b8_conversation.png',
        title: 'System Updates',
        description: 'Ensure your applications are always up-to-date.',
        serviceId: '5'
      },
      {
        id: '24',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/e156ef1e-3ca0-4993-9aca-7e32a4c565b8_conversation.png',
        title: 'Performance Monitoring',
        description: 'Real-time tracking of uptime and system health.',
        serviceId: '5'
      },
      {
        id: '25',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/e156ef1e-3ca0-4993-9aca-7e32a4c565b8_conversation.png',
        title: 'Security Patches',
        description: 'Apply critical security updates proactively.',
        serviceId: '5'
      }
    ]
  },
  {
    id: '6',
    title: 'UI/UX Design',
    description: 'Design that converts. Because looks do matter.',
    type: 'tailored-solution',
    offers: [
      {
        id: '26',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/15ffc7e7-a756-4247-82f6-d718d2b27767_ui-ux.png',
        title: 'User-Centric Design',
        description: 'Create intuitive and visually appealing interfaces.',
        serviceId: '6'
      },
      {
        id: '27',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/15ffc7e7-a756-4247-82f6-d718d2b27767_ui-ux.png',
        title: 'Wireframing & Prototyping',
        description: 'Visualize your product before development.',
        serviceId: '6'
      },
      {
        id: '28',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/15ffc7e7-a756-4247-82f6-d718d2b27767_ui-ux.png',
        title: 'UI Audits',
        description: 'Optimize existing interfaces for better usability.',
        serviceId: '6'
      },
      {
        id: '29',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/15ffc7e7-a756-4247-82f6-d718d2b27767_ui-ux.png',
        title: 'Design Systems',
        description: 'Establish consistent design language across your brand.',
        serviceId: '6'
      },
      {
        id: '30',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/15ffc7e7-a756-4247-82f6-d718d2b27767_ui-ux.png',
        title: 'Accessibility Design',
        description: 'Ensure your product is inclusive and accessible to all.',
        serviceId: '6'
      }
    ]
  },
  {
    id: '7',
    title: 'Consultation & Strategy',
    description: "Not sure where to start? We'll help you figure it out.",
    type: 'tailored-solution',
    offers: [
      {
        id: '31',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/0edfe5a8-05e8-4875-aa04-1675ba1487a8_planning.png',
        title: 'Business Strategy',
        description: 'Plan your tech initiatives with expert guidance.',
        serviceId: '7'
      },
      {
        id: '32',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/0edfe5a8-05e8-4875-aa04-1675ba1487a8_planning.png',
        title: 'Technology Roadmaps',
        description: 'Define your technology roadmap for future growth.',
        serviceId: '7'
      },
      {
        id: '33',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/0edfe5a8-05e8-4875-aa04-1675ba1487a8_planning.png',
        title: 'Process Optimization',
        description: 'Improve internal workflows and systems for efficiency.',
        serviceId: '7'
      },
      {
        id: '34',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/0edfe5a8-05e8-4875-aa04-1675ba1487a8_planning.png',
        title: 'Digital Transformation',
        description:
          'Transition legacy operations into modern digital systems.',
        serviceId: '7'
      },
      {
        id: '35',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/0edfe5a8-05e8-4875-aa04-1675ba1487a8_planning.png',
        title: 'Market Analysis',
        description: 'Identify market trends and tech opportunities.',
        serviceId: '7'
      }
    ]
  },
  {
    id: '8',
    title: 'Cloud Native Applications',
    description:
      'Built to thrive in the cloud — scalable, resilient, and ready for rapid deployment across any environment.',
    type: 'tailored-solution',
    offers: [
      {
        id: '36',
        position: 1,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/f7b84e2b-1b80-483e-87b4-255b9ed5c0b1_database.png',
        title: 'Cloud Solutions',
        description: 'Deploy scalable applications optimized for the cloud.',
        serviceId: '8'
      },
      {
        id: '37',
        position: 2,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/f7b84e2b-1b80-483e-87b4-255b9ed5c0b1_database.png',
        title: 'Microservices Architecture',
        description: 'Build apps with microservices for maximum flexibility.',
        serviceId: '8'
      },
      {
        id: '38',
        position: 3,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/f7b84e2b-1b80-483e-87b4-255b9ed5c0b1_database.png',
        title: 'Cloud Optimization',
        description: 'Optimize cloud usage for cost and performance.',
        serviceId: '8'
      },
      {
        id: '39',
        position: 4,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/f7b84e2b-1b80-483e-87b4-255b9ed5c0b1_database.png',
        title: 'Containerization',
        description: 'Deploy applications using Docker or Kubernetes.',
        serviceId: '8'
      },
      {
        id: '40',
        position: 5,
        imageURL:
          'https://sheba-web-tech.s3.us-east-1.amazonaws.com/f7b84e2b-1b80-483e-87b4-255b9ed5c0b1_database.png',
        title: 'CI/CD & Observability',
        description: 'Automate deployments and monitor system health.',
        serviceId: '8'
      }
    ]
  }
];

export default services;
