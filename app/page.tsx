"use client"
import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
import { FC } from "react";

interface IProjectSearch {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
}

interface SearchParams {
  category?: string;
  endcursor?: string;
}

interface HomeProps {
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;


const Home: FC<HomeProps> = async({ searchParams: { category, endcursor }}) => {

  const data = await fetchAllProjects( category, endcursor ) as IProjectSearch;

  const projectsToDisplay = data?.projectSearch.edges || [];

  if( projectsToDisplay.length === 0 ) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories/>
        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <section className='flex-start flex-col paddings mb-16'>
        
        <Categories/>

        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface}) => (
            <ProjectCard
              key={ node.id }
              id={ node.id }
              image={ node.image }
              title={ node.title }
              name={ node.createdBy.name }
              avatarUrl={ node.createdBy.avatarUrl }
              userId={ node.createdBy.id }
            />
          )).reverse()
          }
        </section>
        <LoadMore
          startCursor={pagination.startCursor} 
          endcursor={pagination.endCursor} 
          hasPreviousPage={pagination.hasPreviousPage} 
          hasNextPage={pagination.hasNextPage}
        />
    </section>
  )
}

export default Home;