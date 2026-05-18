import React from 'react';

const TestimonialSection = ({ testimonials = [] }) => {
  const testimonial = testimonials[0] || {};

  return (
    <section className="bg-primary py-section-gap">
      <div className="px-margin-desktop max-w-container-max mx-auto flex flex-col items-center text-center">
        <span className="material-symbols-outlined text-on-primary text-6xl mb-8 opacity-40">format_quote</span>
        <p className="font-sans text-xl md:text-headline-lg leading-relaxed text-on-primary mb-12 max-w-4xl italic">
          "{testimonial.message || 'Kalatmaka transformed our Jakarta home into a serene sanctuary. Their attention to material quality and the subtle interplay of light and wood is simply unmatched.'}"
        </p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container overflow-hidden">
            <img 
              alt="Client Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuhFQRgljWCJBbGivNlzqCZO_VJd3ry_wsv3PMaEmIXaHlFbQOyB-R_xQnpbR1kftgOT3cnQOAbWlgKZz8UhCBfcTSKsZUAR5tPLWZj3COOxrBOLfTcdw0Uy73BJuH4uc13niBnMYcZVND8Bkb7bnouff3gXp1tkM4sQSADjhNQB_GQ70-bhivsDXG1Sk6ti69wc7MKW0amdXZItL4ISmvRdJGPR17W0YXOoDiL4VLcaiUjF-qmwUvPYbHs9s0SfpLH1FQ8TEhv517"
            />
          </div>
          <div className="text-left">
            <h5 className="font-bold text-on-primary text-body-lg">{testimonial.name || 'Aditya Pratama'}</h5>
            <p className="text-on-primary/70 text-label-sm uppercase tracking-widest">{testimonial.rating || 5}/5 Client Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
