const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{await page.goto('/heritage-maths-revision/');await expect(page.locator('.workspace article h2')).toContainText('Question 1')});
test('question navigation, exact marking and autosave',async({page})=>{
 await page.locator('[data-answer="0"]').fill('36');
 await page.locator('[data-answer="1"]').fill('252');
 await page.getByRole('button',{name:'Check answers'}).click();
 await expect(page.locator('aside')).toContainText('5 / 50');
 await page.getByRole('button',{name:'Next question'}).click();
 await expect(page.locator('.workspace article h2')).toContainText('Question 2');
 await page.reload();
 await expect(page.locator('.workspace article h2')).toContainText('Question 1');
 await expect(page.locator('[data-answer="0"]')).toHaveValue('36');
 await expect(page.locator('aside')).toContainText('5 / 50');
});
test('wrong first submission cannot earn independent credit later',async({page})=>{
 await page.locator('[data-answer="0"]').fill('100');
 await page.getByRole('button',{name:'Check answers'}).click();
 await expect(page.locator('aside')).toContainText('0 / 50');
 await page.locator('[data-answer="0"]').fill('36');
 await page.getByRole('button',{name:'Check answers'}).click();
 await expect(page.locator('aside')).toContainText('0 / 50');
});
test('algebra accepts equivalent expressions in question 6',async({page})=>{
 await page.locator('[data-jump="5"]').click();
 await expect(page.locator('.workspace article h2')).toContainText('Question 6');
 await page.locator('[data-answer="0"]').fill('7+5*(x-1)');
 await page.locator('[data-answer="1"]').fill('77');
 await page.getByRole('button',{name:'Check answers'}).click();
 await expect(page.locator('aside')).toContainText('5 / 50');
});
test('hints and worked solution visible, method textarea persists',async({page})=>{
 await page.getByRole('button',{name:'Get a hint'}).click();
 await expect(page.locator('#details')).toBeVisible();
 await page.getByRole('button',{name:'Show worked solution'}).click();
 await expect(page.locator('#details')).toContainText('Model working');
 await page.getByRole('textbox',{name:'Mathematical working'}).fill('432 / 12 = 36');
 await page.reload();
 await expect(page.getByRole('textbox',{name:'Mathematical working'})).toHaveValue('432 / 12 = 36');
});
test('geometry diagram on question 7 and graph canvas loads',async({page})=>{
 await page.locator('[data-jump="6"]').click();
 await expect(page.locator('#question-diagram svg')).toHaveCount(1);
 await expect(page.locator('#graph-lab svg')).toHaveCount(1);
});

test('switching levels, papers and sets loads separate draft banks',async({page})=>{
 await page.locator('#level').selectOption('Secondary 2');
 await page.locator('#paper').selectOption('Paper 2');
 await page.locator('#set').selectOption('Set 3');
 await expect(page.locator('.workspace article')).toContainText('Secondary 2 · Paper 2 · Set 3');
 await expect(page.locator('[data-jump]')).toHaveCount(10);
 await page.locator('[data-answer="0"]').fill('999');
 await page.locator('#set').selectOption('Set 2');
 await expect(page.locator('[data-answer="0"]')).toHaveValue('');
 await page.locator('#set').selectOption('Set 3');
 await expect(page.locator('[data-answer="0"]')).toHaveValue('999');
});

test('Secondary 2 line graph diagram displays correct plotted points',async({page})=>{
 await page.locator('#level').selectOption('Secondary 2');
 await page.locator('[data-jump="1"]').click();
 const figure=page.locator('#question-diagram svg');
 await expect(figure).toHaveCount(1);
 await expect(figure.locator('circle')).toHaveCount(2);
 await expect(figure).toHaveAttribute('role','img');
 await expect(page.locator('.workspace article')).toContainText('Linear graphs');
});
test('Secondary 1 Set 3 L-shape diagram and answers render',async({page})=>{
 await page.locator('#set').selectOption('Set 3');
 await page.locator('[data-jump="6"]').click();
 const figure=page.locator('#question-diagram svg');
 await expect(figure).toHaveCount(1);
 await expect(figure.locator('path')).toHaveCount(1);
 await expect(page.locator('.workspace article')).toContainText('Composite area');
});

test('Secondary 1 generated graph points remain inside diagram frame',async({page})=>{
 await page.locator('#set').selectOption('Set 3');
 await page.locator('[data-jump="4"]').click();
 const svg=page.locator('#question-diagram svg');
 await expect(svg).toHaveAttribute('aria-label',/Cartesian graph/);
 const dots=svg.locator('circle');
 await expect(dots).toHaveCount(2);
 for(let i=0;i<2;i++){
   const {x,y}=await dots.nth(i).evaluate(el=>({x:Number(el.getAttribute('cx')),y:Number(el.getAttribute('cy'))}));
   expect(x).toBeGreaterThan(0);expect(x).toBeLessThan(480);
   expect(y).toBeGreaterThan(20);expect(y).toBeLessThan(245);
 }
});
