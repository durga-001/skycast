// components/AuthForm.jsx
import { motion } from "framer-motion";

export default function AuthForm({
  title,
  subtitle,
  fields,
  values,
  errors,
  onChange,
  onSubmit,
  submitLabel,
  footer,
  extra,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto backdrop-blur-xl bg-white/5 border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10"
    >
      <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
      {subtitle && (
        <p className="text-slate-400 text-center mt-2 text-sm">{subtitle}</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-slate-300 text-sm mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 transition"
            />
            {errors[field.name] && (
              <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {extra}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold hover:opacity-90 transition"
        >
          {submitLabel}
        </button>
      </form>

      {footer && (
        <div className="mt-5 text-center text-sm text-slate-400">{footer}</div>
      )}
    </motion.div>
  );
}
