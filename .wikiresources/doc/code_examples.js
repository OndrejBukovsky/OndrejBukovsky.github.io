const cppCode = `#include<iostream>

using namespace std;


int main()
{
    printf("Hi in C++\\n");
    cout << "Hi again" << endl;
    return 0;
}`;

const templateCode = `<!-- WikiArticle -->
<!-- Private -->
<!-- Template -->
<!-- Version V0.9 (12.5.2024) -->
<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Stylesheet which contains styles for an article. (Mandartory!) -->
	<link rel="stylesheet" href="../styleArticle.css">
</head>

<body id="body">
	<!-- Div with id="articleBody". (Mandartory!) -->
	<div id="articleBody" class="articleBody">
		<h1 class="articleTitle">Simple template</h1>

		<div id="contentTableDiv">
			<!-- If contentTableDiv is present, a header with id="ContentTableHeader" has to be here to avoid adding it to the content table. -->
			<h2 id="ContentTableHeader">Content table</h2>
		</div>

		<div class="articleSection">
			<h2>Section example</h2>

			<div class="articleSubsection">
				<h3>Subsection</h3>
				<p>Subsection text</p>

				<div class="articleSubSubsection">
					<h4>SubSubsection</h4>
					<p>SubSubsection text</p>
				</div><!-- Section "SubSubsection" end -->
			</div><!-- Section "Subsection" end -->
		</div><!-- Section "Section example" end -->
	</div>
</body>

<!-- JS script which provides basic functionalities such as links, ... (Mandartory!) -->
<script src="../script.js"></script>
<!-- Generation of the content table (Delete this line if a content table is not needed) -->
<script>generateContentTable();</script>

</html>`;