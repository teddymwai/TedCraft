/**
 * Structured Data & Entity Knowledge Graph Generator (Schema.org / JSON-LD)
 * Designed for modern semantic search and generative AI retrieval (Perplexity, ChatGPT Search, Gemini, Google SGE).
 * Zero-emoji compliant.
 */

export const DEFAULT_SITE_URL = 'https://tedcraft.dev';

export interface PersonEntityOptions {
  siteUrl?: string;
}

export function getPersonEntity(siteUrl = DEFAULT_SITE_URL) {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  return {
    '@type': 'Person',
    '@id': `${cleanUrl}/#person`,
    name: 'Thaddeus W. Mwai',
    alternateName: ['Ted Mwai', 'Teddy Mwai', 'Thaddeus (Ted) Mwai'],
    givenName: 'Thaddeus',
    familyName: 'Mwai',
    url: cleanUrl,
    jobTitle: [
      'Software QA Lead',
      'Senior Risk Strategist',
      'Risk Ambassador',
      'Cyber Security Consultant',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'CYBER RANGES',
        url: 'https://cyberranges.com',
      },
      {
        '@type': 'Organization',
        name: 'Silensec',
        url: 'https://www.silensec.com',
      },
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'United States International University - Africa',
      alternateName: 'USIU-Africa',
      url: 'https://www.usiu.ac.ke',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Science in Information Systems Technology',
        educationalLevel: 'Bachelor of Science',
        about: ['Cyber/Computer Forensics', 'Counterterrorism'],
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'United States International University - Africa',
        },
      },
    ],
    knowsAbout: [
      'Cybersecurity',
      'Cyber Forensics & Counterterrorism',
      'Adversary Threat Emulation (TTPs)',
      'Zero Trust Access Governance',
      'Wire-Protocol Verification',
      'Privilege Revocation',
      'Cloud Security Auditing',
      'Live-Fire Cyber Drill Gating',
      'Infrastructure-as-Code (IaC) Verification',
      'SIEM Detection Optimization',
      'Distributed Systems Reliability',
      'High-Assurance Platform Verification',
      'HTTP Archive (HAR) Inspection',
      'OpenStack Infrastructure Testing',
      'Industrial Control Systems (ICS) Simulation',
      'Quality Engineering Leadership',
      'Role-Based Access Control (RBAC)',
    ],
    sameAs: [
      'https://www.linkedin.com/in/teddymwai/',
      'https://github.com/teddymwai',
      'https://gitlab.com/teddymwai',
    ],
  };
}

export function getWebSiteEntity(siteUrl = DEFAULT_SITE_URL) {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  return {
    '@type': 'WebSite',
    '@id': `${cleanUrl}/#website`,
    name: 'TedCraft',
    url: cleanUrl,
    description: 'Technical ledger, high-assurance platform verification, access governance, and engineering post-mortems.',
    publisher: {
      '@id': `${cleanUrl}/#person`,
    },
  };
}

export function getProfilePageSchema(siteUrl = DEFAULT_SITE_URL, pathname = '/about') {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  const pageUrl = `${cleanUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonEntity(cleanUrl),
      getWebSiteEntity(cleanUrl),
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'About Thaddeus W. Mwai | Software QA Lead & Senior Risk Strategist',
        description: 'Software QA Lead, Senior Risk Strategist, and Systems Automation Engineer at CYBER RANGES. 5+ years across high-assurance test automation, access governance, and technology risk.',
        isPartOf: {
          '@id': `${cleanUrl}/#website`,
        },
        mainEntity: {
          '@id': `${cleanUrl}/#person`,
        },
      },
    ],
  };
}

export function getHomeGraphSchema(siteUrl = DEFAULT_SITE_URL) {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonEntity(cleanUrl),
      getWebSiteEntity(cleanUrl),
      {
        '@type': 'WebPage',
        '@id': `${cleanUrl}/#webpage`,
        url: cleanUrl,
        name: 'Thaddeus W. Mwai | TedCraft · Software QA Lead & Senior Risk Strategist',
        description: 'Software QA Lead and Senior Risk Strategist at CYBER RANGES. Showcasing high-assurance verification platforms, access governance engines, and technical post-mortems.',
        isPartOf: {
          '@id': `${cleanUrl}/#website`,
        },
        about: {
          '@id': `${cleanUrl}/#person`,
        },
      },
    ],
  };
}

export function getSoftwareApplicationSchema(
  siteUrl = DEFAULT_SITE_URL,
  entry: {
    id: string;
    data: {
      title: string;
      tagline?: string;
      description: string;
      category: string;
      tags: string[];
      date: Date;
      github?: string;
      gitlab?: string;
      demo?: string;
    };
  }
) {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  const pageUrl = `${cleanUrl}/works/${entry.id}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonEntity(cleanUrl),
      {
        '@type': ['SoftwareApplication', 'TechArticle'],
        '@id': `${pageUrl}#software`,
        url: pageUrl,
        name: entry.data.title,
        headline: entry.data.tagline || entry.data.title,
        description: entry.data.description,
        applicationCategory: entry.data.category,
        datePublished: entry.data.date.toISOString(),
        author: {
          '@id': `${cleanUrl}/#person`,
        },
        publisher: {
          '@id': `${cleanUrl}/#person`,
        },
        keywords: entry.data.tags.join(', '),
        codeRepository: entry.data.gitlab || entry.data.github,
        installUrl: entry.data.demo,
        about: entry.data.tags.map((tag) => ({
          '@type': 'Thing',
          name: tag,
        })),
      },
    ],
  };
}

export function getTechArticleSchema(
  siteUrl = DEFAULT_SITE_URL,
  entry: {
    id: string;
    data: {
      title: string;
      subtitle: string;
      topic: string;
      curveLevel: string;
      obstacle: string;
      breakthrough: string;
      takeaways: string[];
      tags: string[];
      date: Date;
    };
  }
) {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  const pageUrl = `${cleanUrl}/learning-curves/${entry.id}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonEntity(cleanUrl),
      {
        '@type': 'TechArticle',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: entry.data.title,
        alternativeHeadline: entry.data.subtitle,
        description: `${entry.data.obstacle} Breakthrough: ${entry.data.breakthrough}`,
        articleSection: entry.data.topic,
        proficiencyLevel: entry.data.curveLevel,
        datePublished: entry.data.date.toISOString(),
        author: {
          '@id': `${cleanUrl}/#person`,
        },
        publisher: {
          '@id': `${cleanUrl}/#person`,
        },
        keywords: entry.data.tags.join(', '),
        about: [
          { '@type': 'Thing', name: entry.data.topic },
          ...entry.data.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
        ],
      },
    ],
  };
}

export function getBlogPostingSchema(
  siteUrl = DEFAULT_SITE_URL,
  entry: {
    id: string;
    data: {
      title: string;
      description: string;
      pubDate: Date;
      updatedDate?: Date;
      tags: string[];
    };
  }
) {
  const cleanUrl = siteUrl.replace(/\/$/, '');
  const pageUrl = `${cleanUrl}/blog/${entry.id}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonEntity(cleanUrl),
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        url: pageUrl,
        headline: entry.data.title,
        description: entry.data.description,
        datePublished: entry.data.pubDate.toISOString(),
        dateModified: (entry.data.updatedDate || entry.data.pubDate).toISOString(),
        author: {
          '@id': `${cleanUrl}/#person`,
        },
        publisher: {
          '@id': `${cleanUrl}/#person`,
        },
        keywords: entry.data.tags.join(', '),
        about: entry.data.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
      },
    ],
  };
}
