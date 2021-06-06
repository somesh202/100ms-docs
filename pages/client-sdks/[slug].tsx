/* eslint-disable @typescript-eslint/no-explicit-any */
import hydrate from 'next-mdx-remote/hydrate';
import { getFiles, getFileBySlug } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import DocLayout from '@/layouts/DocLayout';
import getSidebarData, { SidebarDataType } from '@/lib/getSidebarData';

export default function Blog(data: any) {
    const { mdxSource, frontMatter } = data.post;
    const sideArr = data.sidebarData;
    const { allSlugList } = data;
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return (
        <DocLayout frontMatter={frontMatter} docsArr={sideArr} allSlugList={allSlugList}>
            {content}
        </DocLayout>
    );
}

export async function getStaticPaths() {
    const notes = await getFiles('client-sdks');

    return {
        paths: notes.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }: any) {
    // params: { slug: 'blog-slug' }
    const { sidebarData, allSlugList }: SidebarDataType = await getSidebarData();
    const post = await getFileBySlug('client-sdks', params.slug);
    const data = { sidebarData, post, allSlugList };
    return { props: data };
}