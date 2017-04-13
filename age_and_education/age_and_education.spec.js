describe('age and education report', function() {
  it('should render the address for the report research specification', function() {


    

    browser.ignoreSynchronization = true;
    // browser.executeScript('return ');



    browser.get('http://localhost:8080/age_and_education/age_and_education.html');

    browser.executeScript(function () {

        window.data =   "zenra";

    });

    browser.executeScript('return window.data').then( data => {
        console.log(data)
    });

    // browser.executeScript(function(){
       
    // })

    

    // element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    // element(by.css('[value="add"]')).click();

    expect(true).toEqual(true)

    browser.wait(function() {
        return element(by.css('.address')).isPresent();
    }, 5000);

    var address = element(by.css('.address'));

    expect(address.getText()).toEqual('205 Windrift Drive, Gibsonville, NC')

    // expect(todoList.count()).toEqual(3);
    // expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // // You wrote your first test, cross it off the list
    // todoList.get(2).element(by.css('input')).click();
    // var completedAmount = element.all(by.css('.done-true'));
    // expect(completedAmount.count()).toEqual(2);
  });
});