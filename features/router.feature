Feature: Router
	In order to have an SPA app
	As a developer
	I want to have functional routing

  Scenario: Toggling between routes validation
    Given I am on a homepage
    Then I should first see Home yo! header
    When I click .push("/about")
    Then I should now see About yo! header
    When I now click .goBack() link
    Then I should see Home yo! again
