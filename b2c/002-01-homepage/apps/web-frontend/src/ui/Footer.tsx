export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm flex flex-wrap gap-4">
        <a href="/terms">Conditions of use & sale</a>
        <a href="/privacy">Privacy notice</a>
        <a href="/cookies">Cookies notice</a>
        <a href="/about">About</a>
        <span className="ml-auto">© {new Date().getFullYear()} eShop</span>
      </div>
    </footer>
  );
}
