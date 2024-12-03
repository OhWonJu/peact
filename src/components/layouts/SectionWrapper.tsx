interface SectionWrapperProps {
  children: any;
  title?: string;
}

const SectionWrapper = ({ children, title }: SectionWrapperProps) => {
  return (
    <section className="w-full bg-white rounded-lg overflow-hidden mt-8">
      <div className="py-2 bg-purple-800 px-6 text-white">{title}</div>
      <div className="px-6 py-8">{children}</div>
    </section>
  );
};

export default SectionWrapper;
