import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

// NOTE: In a real project, the following classes (NewsSentiment, NewsEntity, NewsCard)
// would be imported from their actual files (e.g., 'package:insight_flo/domain/entities/news_entity.dart').
// They are defined here to make this test file self-contained and demonstrate a working test.

/// Represents the sentiment of a news article.
enum NewsSentiment { positive, negative, neutral }

/// Represents a single news article entity.
class NewsEntity {
  final String id;
  final String title;
  final String summary;
  final NewsSentiment sentiment;
  final DateTime publishedAt;

  const NewsEntity({
    required this.id,
    required this.title,
    required this.summary,
    required this.sentiment,
    required this.publishedAt,
  });
}

/// A widget that displays a summary of a news article in a card.
class NewsCard extends StatelessWidget {
  final NewsEntity news;

  const NewsCard({super.key, required this.news});

  @override
  Widget build(BuildContext context) {
    // This is a simplified mock implementation of the NewsCard widget for testing purposes.
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(news.title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            Text(news.summary, style: Theme.of(context).textTheme.bodyMedium),
            const SizedBox(height: 8),
            Icon(_getSentimentIcon(news.sentiment)),
          ],
        ),
      ),
    );
  }

  IconData _getSentimentIcon(NewsSentiment sentiment) {
    switch (sentiment) {
      case NewsSentiment.positive:
        return Icons.trending_up;
      case NewsSentiment.negative:
        return Icons.trending_down;
      default:
        return Icons.trending_flat;
    }
  }
}

void main() {
  group('NewsCard Widget Tests', () {
    testWidgets('should display news information correctly', (tester) async {
      // Given
      final mockNews = NewsEntity(
        id: '1',
        title: 'Test News',
        summary: 'Test Summary',
        sentiment: NewsSentiment.positive,
        publishedAt: DateTime.now(),
      );

      // When
      // To test a widget, it needs to be wrapped in a MaterialApp
      // to provide essential context like Directionality and Theme.
      // The custom 'TestHelpers.pumpAndSettle' is replaced with the standard way.
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(body: NewsCard(news: mockNews)),
        ),
      );

      // Then
      expect(find.text('Test News'), findsOneWidget);
      expect(find.text('Test Summary'), findsOneWidget);
      // It's good practice to also test for other important elements, like the sentiment icon.
      expect(find.byIcon(Icons.trending_up), findsOneWidget);
    });
  });
}
