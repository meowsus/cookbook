import { JSDOM } from "jsdom";
import assert from "node:assert";
import { assignBlockIds, simplifyDom } from "./dom";

async function runTests() {
  console.log("Running simplifyDom tests...");

  // Test 1: Noise removal
  const html1 = `<html><body><nav>Nav</nav><header>Header</header><main>Content</main><footer>Footer</footer></body></html>`;
  const dom1 = new JSDOM(html1);
  assignBlockIds(dom1.window.document);
  const result1 = simplifyDom(dom1.window.document);
  if (result1.includes("Nav") || result1.includes("Footer")) {
    assert.fail("Test 1 Failed: Noise not removed");
  }
  console.log("✅ Test 1: Noise removal passed");

  // Test 2: Attribute removal
  const html2 = `<html><body><div id="main" class="container" data-ignore="true">Content</div></body></html>`;
  const dom2 = new JSDOM(html2);
  assignBlockIds(dom2.window.document);
  const result2 = simplifyDom(dom2.window.document);
  if (
    !result2.includes('id="main"') ||
    !result2.includes('class="container"')
  ) {
    assert.fail("Test 2 Failed: Essential attributes removed");
  }
  if (result2.includes('data-ignore="true"')) {
    assert.fail("Test 2 Failed: Non-essential attributes preserved");
  }
  console.log("✅ Test 2: Attribute removal passed");

  // Test 3: Nested div collapsing
  const html3 = `<html><body><div><div><div><p>Deep content</p></div></div></div></body></html>`;
  const dom3 = new JSDOM(html3);
  assignBlockIds(dom3.window.document);
  const result3 = simplifyDom(dom3.window.document);
  if (!result3.includes("Deep content")) {
    assert.fail("Test 3 Failed: Content lost during collapsing");
  }
  const divCount = (result3.match(/<div/g) || []).length;
  if (divCount > 1) {
    assert.fail(`Test 3 Failed: Divs not collapsed. Count: ${divCount}`);
  }
  console.log("✅ Test 3: Nested div collapsing passed");

  // Test 4: Block ID assignment
  const html4 = `<html><body><main><p>P1</p><div><p>P2</p></div></main></body></html>`;
  const dom4 = new JSDOM(html4);
  assignBlockIds(dom4.window.document);
  const result4 = simplifyDom(dom4.window.document);
  if (!result4.includes("data-block-id=")) {
    assert.fail("Test 4 Failed: Block IDs not assigned");
  }
  console.log("✅ Test 4: Block ID assignment passed");

  // Test 5: Size reduction
  const largeHtml = `<html><body><nav>
    ${"<div>Noise</div>".repeat(1000)}
  </nav><main><div id="recipe">Recipe content</div></main></body></html>`;

  const dom5 = new JSDOM(largeHtml);
  assignBlockIds(dom5.window.document);
  const result5 = simplifyDom(dom5.window.document);

  const originalSize = Buffer.byteLength(largeHtml);
  const simplifiedSize = Buffer.byteLength(result5);

  if (simplifiedSize >= originalSize * 0.5) {
    assert.fail(
      `Test 5 Failed: Size not significantly reduced. ${originalSize} -> ${simplifiedSize}`,
    );
  }
  console.log(
    `✅ Test 5: Size reduction passed (${originalSize} -> ${simplifiedSize})`,
  );

  // Test 6: Empty document
  const html6 = `<html><body></body></html>`;
  const dom6 = new JSDOM(html6);
  assignBlockIds(dom6.window.document);
  const result6 = simplifyDom(dom6.window.document);
  if (result6 !== "") {
    assert.fail("Test 6 Failed: Empty document should result in empty string");
  }
  console.log("✅ Test 6: Empty document passed");

  // Test 7: Extreme nesting
  let nestedHtml = "<html><body>";
  for (let i = 0; i < 100; i++) {
    nestedHtml += "<div>";
  }
  nestedHtml += "<p>Deep Content</p>";
  for (let i = 0; i < 100; i++) {
    nestedHtml += "</div>";
  }
  nestedHtml += "</body></html>";
  const dom7 = new JSDOM(nestedHtml);
  assignBlockIds(dom7.window.document);
  const result7 = simplifyDom(dom7.window.document);
  if (!result7.includes("Deep Content")) {
    assert.fail("Test 7 Failed: Content lost in extreme nesting");
  }
  const finalDivCount = (result7.match(/<div/g) || []).length;
  if (finalDivCount > 1) {
    assert.fail(`Test 7 Failed: Divs not collapsed. Count: ${finalDivCount}`);
  }
  console.log("✅ Test 7: Extreme nesting passed");
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
