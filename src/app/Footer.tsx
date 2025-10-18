export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
      <aside>
        <p>
          May your meals be merry in the year of Our Lard{" "}
          {new Date().getFullYear()}
        </p>
      </aside>
    </footer>
  );
}
