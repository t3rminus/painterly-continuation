# Making Pull Requests the Easy Way

Contributing to projects on GitHub is surprisingly easy, and done in a way to try and minimize the headaches that come from a large number of people working together on the same files.

The general process is as follows:

1. [Fork the project](#step-1---make-an-account-and-fork-the-project) - This will create a copy that you can work on
    - [Create an account](#create-an-account)
    - [Download GitHub Desktop](#download-github-desktop)
    - [Fork the repository](#fork-the-repository)
2. [Make your changes](#step-2---make-your-changes) - Do whatever you'd like to the copy
    - [Craete a branch](#create-a-branch)
    - [Make changes!](#make-changes)
3. [Make a Pull Request](#step-3---make-a-pull-request) - ***Request*** that your changes are ***pulled*** back into the original repository
    - [Make the pull request](#make-the-pull-request)
    - [Discuss and edit](#discuss-and-edit)
    - [Have your changes merged](#have-your-changes-merged)
4. [Contribute more](#step-4---contribute-more) - Keep doing what you're doing!

For the sake of keeping things as beginner-friendly as possible, I'm going to write this guide using the GitHub Desktop application. This entire process can be accomplished with the command-line git tools, and I encourage you to read up on the process elsewhere if you want to learn more.

---

### Terminology
Some common terms are provided here to add some clarification to the tutorial. It's alright if you don't understand them completely, since it should be fairly clear how things work in context, and you'll pick it up in no time.
- **repo** - Short for "repository". A repository is a collection of files that are tracked in order to make changes and collaboration easy to manage.
- **commit** - A "snapshot" of one set of changes, by one person, at one point in time. This is both a noun (a commit, or one snapshot), or a verb (to make a commit, to finalize and record that snapshot).
- **fork** - Like a fork in the road, this is a copy of the entire project up to a certain point. At that point, you're able to take the project in a different direction.
- **branch** - Similar to a fork, but smaller. A fork can have many branches, and it's recommended that you create a new branch whenever you start making changes.
- **merge** - Exactly what it sounds like. The act of merging the changes in a pull request into the project, or from one branch to another.

---

## Questions, Comments, or Suggestions?
If something in this guide isn't clear, please click here to open an issue, and describe the problems you're having: https://github.com/t3rminus/painterly-continuation/issues/new

You can also use these steps to propose changes to this guide itself! *(gasp!)*
Follow the steps, and you'll find the guide under the "docs" directory, where you can edit it directly using Markdown formatting:
- https://daringfireball.net/projects/markdown/syntax
- https://github.github.com/gfm/

---

## Step 1 - Make an account and fork the project

### Create an account
If you don't already have a GitHub account you can sign up for one here: https://github.com/join

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-1.png?raw=true" width="360" />

### Download GitHub Desktop
Once you've completed that process, you will need to download the GitHub desktop application here: https://desktop.github.com

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-2.png?raw=true" width="360" />

The sign-in steps should be very straightforward for GitHub Desktop. It will direct you to the website, ask you to confirm you want to allow the application to sign-in with your account, and then redirect you back to GitHub Destkop. Remember to hit "Open" when presented with a pop-up like this one, otherwise you might need to sign out and back in.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-3.png?raw=true" width="360" />

If all goes well, you should see this screen. Hit "Continue" and you'll be ready to go.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-4.png?raw=true" width="360" />


### Fork the Repository

Now open up the painterly repository here https://github.com/t3rminus/painterly-continuation, and look for the little button in the top-right that says "Fork".

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-5.png?raw=true" width="120" />

One click of this button, and you will have your own fork of the project! It's that easy!

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-6.png?raw=true" width="480" />

To use the project in GitHub Desktop, simply click "Code", then "Open with GitHub Desktop". You'll then be taken to GitHub Desktop, where it will show the URL of your fork, and the location to save it on your computer.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-7.png?raw=true" width="380" />
<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-8.png?raw=true" width="380" />

Finally, GitHub Desktop will ask you how you plan on using this fork. Select "To contribute to the parent project". This choice affects what information is displayed in GitHub Desktop, and picks defaults that refer back to the original repository, rather than your fork.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-9.png?raw=true" width="380" />

You're now ready to make all the changes you'd like! If you didn't change the defaults, the repository is kept in your Documents folder, under "GitHub". You can also open it by clicking here:

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-10.png?raw=true" width="380" />
---

## Step 2 - Make your changes

### Create a branch
The first step in making changes is to create a **branch**. This will allow you to keep your changes grouped together, and let you work on new changes while you're waiting for others to review your other work.


Simply click "Branch", then "New branch...". Name the branch whatever you'd like, but a short, descriptive name is better.
<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-12.png?raw=true" width="380" />
<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-11.png?raw=true" width="380" />

Once that's done, you're ready to start editing!

### Make changes!
There's no tutorial for this step. You have a copy you can edit to your heart's content!

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-13.png?raw=true" width="640" />

**Important Note:** While you can make thousands of changes all at once, and submit a *massive* pull request all together, please do not do this. Limit yourself to small, bite-size changes, ideally no more than 4-5 textures or choices at a time. Even break it up into a single choice or change.

We have to review each change you make, and trying to sort through thousands of files is extremely difficult, and puts a lot of work on the maintainers of this repository.

**Please keep your changes small, and bite-sized. Make 10 pull requests with 1 change, instead of 1 pull request with 10 changes**

---

## Step 3 - Make a Pull Request

### Make the Pull Request
The next time you open up GitHub Desktop, you'll notice that it has dutifully kept track of which files you've added, deleted, or changed.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-14.png?raw=true" width="480" />

On the left side of this window, you can see a list of all the files, and the button for adding a commit. **You must write a summary of what you've changed**. Use the list to review the changes yourself, and write a quick summary and (optionally) a longer description of your changes.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-15.png?raw=true" width="240" />
<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-16.png?raw=true" width="240" />


When you're ready, click "Commit to \<branch>". (Where \<branch> is the name of the branch you created.)

Now your changes are tracked in a commit. We now need to upload this commit to GitHub. Simply click "Publish branch", or in the top menu "Repository" > "Push". Despite being named differently, these two buttons do exactly the same thing: upload your branch to GitHub.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-17.png?raw=true" width="340" />
<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-18.png?raw=true" width="240" />

When this is done, you'll get a new option: Create a Pull Request. You can either click this button, or click on the top menu "Branch" > "Create Pull Request"

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-19.png?raw=true" width="340" />
<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-20.png?raw=true" width="240" />

This will open github.com with your new pull request. Here you can add more detail and type a longer description. Project maintainers and other public members can see this information, so it's a good idea to be as descriptive as possible.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-21.png?raw=true" width="480" />

### Discuss and edit
A pull request is like a forum thread, where people can discuss it. You might be asked to make more changes or clarify why you've done things the way you've done them. I've you've already started work on more changes in a new branch, you can always return to your previous branch with the "Current Branch" menu. **Remember to commit your changes to your new branch first, even if it's a work-in-progress**.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-22.png?raw=true" width="320" />

This will put you right back to where you were when you made the pull request, so you can make those changes and publish your updated branch.

### Have your changes merged
When the maintainers of the project are satisfied with your work, and there are no mistakes, your changes will be merged in, and your contribution will be noted in the original repository. Hooray!

## Step 4 - Contribute more
If you have more to do, [start again at Step 2](#step-2---make-your-changes)! Create a new branch, and begin working on your next set of changes.

When you're asked which branch to base your work on, select "upstream/main". This will ensure you're starting at the latest version of the files.

<img src="https://github.com/t3rminus/painterly-continuation/blob/main/docs/images/howto-23.png?raw=true" width="480" />