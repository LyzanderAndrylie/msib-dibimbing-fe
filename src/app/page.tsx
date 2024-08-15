'use client';
import { motion } from 'framer-motion';
import { IoLogoGithub } from 'react-icons/io5';
import ButtonLink from '@/components/ButtonLink';

const flyInContainer = {
  flyInFrom: {},
  flyInTo: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const flyInItem = {
  flyInFrom: { opacity: 0, y: 100 },
  flyInTo: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 md:p-8">
      <motion.section
        className="flex max-h-[75ch] flex-col items-center gap-4 text-center"
        initial="flyInFrom"
        animate="flyInTo"
        variants={flyInContainer}
      >
        <motion.h1 className="text-5xl font-bold" variants={flyInItem}>
          Streamline Your Note-Taking Experience with{' '}
          <span className="inline-block rounded-lg bg-slate-200 p-2">
            MyNote
          </span>
        </motion.h1>
        <motion.p
          className="max-w-[750px] text-lg text-slate-600"
          variants={flyInItem}
        >
          Experience the ultimate note-taking app that simplifies how you manage
          your notes.
        </motion.p>
        <motion.div className="flex gap-4" variants={flyInItem}>
          <ButtonLink href="/notes?sort=desc">Try Now</ButtonLink>
          <ButtonLink
            href="https://github.com/LyzanderAndrylie/msib-dibimbing-fe"
            variant="secondary"
          >
            <IoLogoGithub size={20} className="mr-1" />
            GitHub
          </ButtonLink>
        </motion.div>
      </motion.section>
    </main>
  );
}
